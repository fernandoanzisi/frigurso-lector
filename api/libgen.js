const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept': 'text/html,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.5' };

// ── DuckDuckGo: busca en Libgen/Annas-Archive sin que bloqueen Vercel ─────────
async function searchDDG(query) {
  const q = `"${query}" (site:libgen.is OR site:libgen.rs OR site:annas-archive.org) pdf`;
  const r = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
    headers: { ...H, 'Referer': 'https://duckduckgo.com/' },
    signal: AbortSignal.timeout(9000),
  });
  if (!r.ok) throw new Error('DDG ' + r.status);
  const html = await r.text();

  const libros = [];
  const seen = new Set();
  // Cada resultado DDG tiene uddg=URL_codificada en el href
  const blocks = html.split(/class="result[^"]*result__body/);
  for (const block of blocks.slice(1)) {
    const urlM = /uddg=([^&"]+)/.exec(block);
    if (!urlM) continue;
    let url;
    try { url = decodeURIComponent(urlM[1]); } catch(e) { continue; }
    // MD5 de 32 caracteres hex en la URL
    const md5M = /[?&/=]([a-f0-9]{32})(?:[^a-f0-9]|$)/i.exec(url);
    if (!md5M) continue;
    const md5 = md5M[1].toLowerCase();
    if (seen.has(md5)) continue;
    seen.add(md5);
    // Título del resultado DDG
    const titleM = /result__a[^>]*>([\s\S]*?)<\/a/i.exec(block);
    let titulo = titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : query;
    titulo = titulo.replace(/\s*[|\-–]\s*(Libgen|Library Genesis|Anna.*Archive).*/i, '').trim() || query;
    // Detectar formato en URL o snippet
    const fmtM = /\b(epub)\b/i.exec(url + block);
    const formato = fmtM ? 'EPUB' : 'PDF';
    libros.push({ id:'0', titulo, autor:'', year:'', idioma:'', formato, tamano:'', paginas:'', md5 });
  }
  return libros;
}

// ── Anna's Archive directa ────────────────────────────────────────────────────
async function searchAnnas(query) {
  const r = await fetch(`https://annas-archive.org/search?q=${encodeURIComponent(query)}&filetype=pdf`, {
    headers: H, signal: AbortSignal.timeout(9000), redirect: 'follow',
  });
  if (!r.ok) throw new Error('Annas ' + r.status);
  const html = await r.text();
  const libros = [];
  const seen = new Set();
  const re = /href="\/md5\/([a-f0-9]{32})"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const md5 = m[1].toLowerCase();
    if (seen.has(md5)) continue;
    seen.add(md5);
    // contexto de texto alrededor del link
    const ctx = html.substring(m.index, m.index + 600).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const fmtM = /\b(pdf|epub)\b/i.exec(ctx);
    if (!fmtM) continue;
    const sizeM = /(\d+\.?\d*)\s*(MB|KB)/i.exec(ctx);
    const parts = ctx.split(/\s{3,}/).map(s => s.trim()).filter(s => s.length > 2);
    libros.push({
      id:'0', titulo: parts[0] || query, autor: parts[1] || '',
      year:'', idioma:'', formato: fmtM[1].toUpperCase(),
      tamano: sizeM ? sizeM[1]+' '+sizeM[2].toUpperCase() : '',
      paginas:'', md5,
    });
  }
  return libros;
}

// ── Libgen directo (fallback, puede estar bloqueado) ─────────────────────────
async function searchLibgen(query) {
  for (const mirror of ['libgen.rs','libgen.is','libgen.st','libgen.li']) {
    try {
      const r = await fetch(
        `https://${mirror}/search.php?req=${encodeURIComponent(query)}&res=25&view=simple&column=def`,
        { headers: H, signal: AbortSignal.timeout(7000), redirect:'follow' }
      );
      if (!r.ok) continue;
      const html = await r.text();
      if (html.length < 500) continue;
      const ids = [...new Set([...html.matchAll(/<td[^>]*>\s*(\d{3,})\s*<\/td>/g)].map(m=>m[1]))]
        .filter(id=>parseInt(id)>100).slice(0,30);
      if (!ids.length) continue;
      const jr = await fetch(
        `https://${mirror}/json.php?ids=${ids}&fields=id,title,author,md5,extension,filesize,language,year,pages`,
        { headers: H, signal: AbortSignal.timeout(7000) }
      );
      const data = await jr.json();
      return (Array.isArray(data)?data:[])
        .filter(l=>l.md5&&['pdf','epub'].includes((l.extension||'').toLowerCase()))
        .map(l=>({
          id:l.id, titulo:l.title||'?', autor:l.author||'',
          year:l.year||'', idioma:l.language||'',
          formato:(l.extension||'').toUpperCase(),
          tamano:l.filesize?fmtB(+l.filesize):'', paginas:l.pages||'',
          md5:l.md5.toLowerCase(),
        }));
    } catch(e){}
  }
  return [];
}

function fmtB(b){
  if(!b)return'';
  return b<1048576?Math.round(b/1024)+' KB':(b/1048576).toFixed(1)+' MB';
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});

  const { query } = req.body||{};
  if(!query?.trim()) return res.status(400).json({error:'Falta query'});

  // Buscar en paralelo en todas las fuentes
  const [r1,r2,r3] = await Promise.allSettled([
    searchDDG(query.trim()),
    searchAnnas(query.trim()),
    searchLibgen(query.trim()),
  ]);

  // Combinar sin duplicados por MD5
  const seen = new Set();
  const libros = [];
  for(const r of [r1,r2,r3]){
    if(r.status==='fulfilled' && Array.isArray(r.value)){
      for(const l of r.value){
        if(!seen.has(l.md5)){seen.add(l.md5);libros.push(l);}
      }
    }
  }

  res.json({ libros });
};

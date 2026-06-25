// Edge Runtime: corre en la red de Cloudflare (IPs diferentes a AWS, Libgen no las bloquea)
export const config = { runtime: 'edge' };

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept': 'text/html,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.5' };
const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── DuckDuckGo: busca PDFs directos de cualquier fuente ───────────────────────
async function ddgSearch(q) {
  const r = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
    headers: { ...H, 'Referer': 'https://duckduckgo.com/' },
    signal: AbortSignal.timeout(9000),
  });
  if (!r.ok) return [];
  const html = await r.text();
  const libros = [];
  const seen = new Set();
  // Cada resultado DDG tiene uddg=URL en el href
  const re = /uddg=([^&"]+)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    let url;
    try { url = decodeURIComponent(m[1]); } catch(e) { continue; }
    if (seen.has(url)) continue;
    seen.add(url);

    // Buscar 500 chars antes del match para extraer título
    const ctx = html.substring(Math.max(0, m.index - 600), m.index + 200);
    const titleM = /result__a[^>]*>([\s\S]*?)<\/a/i.exec(ctx);
    let titulo = titleM ? titleM[1].replace(/<[^>]+>/g,'').trim() : '';
    titulo = titulo.replace(/\s*[|—\-]\s*(Libgen|Library Genesis|Anna.*|PDFDrive|Z-Lib).*/i,'').trim() || q;

    // Caso A: URL con MD5 de 32 hex (Libgen, Anna's Archive, Library.lol)
    const md5M = /[?&/=]([a-f0-9]{32})(?:[^a-f0-9]|$)/i.exec(url);
    if (md5M) {
      const md5 = md5M[1].toLowerCase();
      libros.push({ tipo:'md5', titulo, autor:'', year:'', idioma:'', formato:'PDF', tamano:'', paginas:'', md5, id:'0' });
      continue;
    }
    // Caso B: URL directa de PDF (termina en .pdf o pasa por un servidor de PDFs)
    if (/\.pdf(\?|$)/i.test(url) || url.includes('/download/') && url.includes('pdf')) {
      libros.push({ tipo:'url', titulo, autor:'', year:'', idioma:'', formato:'PDF', tamano:'', paginas:'', md5:'', id:'0', dlUrl: url });
    }
  }
  return libros;
}

// ── Anna's Archive ─────────────────────────────────────────────────────────────
async function searchAnnas(query) {
  const r = await fetch(`https://annas-archive.org/search?q=${encodeURIComponent(query)}&filetype=pdf`, {
    headers: H, signal: AbortSignal.timeout(9000), redirect: 'follow',
  });
  if (!r.ok) return [];
  const html = await r.text();
  const libros = [];
  const seen = new Set();
  const re = /href="\/md5\/([a-f0-9]{32})"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const md5 = m[1].toLowerCase();
    if (seen.has(md5)) continue;
    seen.add(md5);
    const ctx = html.substring(m.index, m.index+600).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
    const fmtM = /\b(pdf|epub)\b/i.exec(ctx);
    if (!fmtM) continue;
    const sizeM = /(\d+\.?\d*)\s*(MB|KB)/i.exec(ctx);
    const parts = ctx.split(/\s{3,}/).map(s=>s.trim()).filter(s=>s.length>2);
    libros.push({ tipo:'md5', titulo:parts[0]||query, autor:parts[1]||'', year:'', idioma:'',
      formato:fmtM[1].toUpperCase(), tamano:sizeM?sizeM[1]+' '+sizeM[2].toUpperCase():'', paginas:'', md5, id:'0' });
  }
  return libros;
}

// ── Libgen directo ─────────────────────────────────────────────────────────────
async function searchLibgen(query) {
  for (const m of ['libgen.rs','libgen.is','libgen.st','libgen.li']) {
    try {
      const r = await fetch(`https://${m}/search.php?req=${encodeURIComponent(query)}&res=25&view=simple&column=def`,
        { headers: H, signal: AbortSignal.timeout(8000), redirect:'follow' });
      if (!r.ok) continue;
      const html = await r.text();
      if (html.length < 500) continue;
      const ids = [...new Set([...html.matchAll(/<td[^>]*>\s*(\d{3,})\s*<\/td>/g)].map(x=>x[1]))]
        .filter(id=>+id>100).slice(0,25);
      if (!ids.length) continue;
      const jr = await fetch(`https://${m}/json.php?ids=${ids}&fields=id,title,author,md5,extension,filesize,language,year,pages`,
        { headers: H, signal: AbortSignal.timeout(7000) });
      const data = await jr.json();
      return (Array.isArray(data)?data:[])
        .filter(l=>l.md5&&['pdf','epub'].includes((l.extension||'').toLowerCase()))
        .map(l=>({ tipo:'md5', id:l.id, titulo:l.title||'?', autor:l.author||'', year:l.year||'',
          idioma:l.language||'', formato:(l.extension||'').toUpperCase(),
          tamano:l.filesize?fmtB(+l.filesize):'', paginas:l.pages||'', md5:l.md5.toLowerCase() }));
    } catch(e){}
  }
  return [];
}

function fmtB(b){ return b<1048576?Math.round(b/1024)+' KB':(b/1048576).toFixed(1)+' MB'; }

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null,{status:200,headers:CORS});
  if (req.method !== 'POST') return new Response(JSON.stringify({error:'Method not allowed'}),{status:405,headers:CORS});

  let query;
  try { ({query}=await req.json()); } catch(e) { return new Response(JSON.stringify({error:'Bad request'}),{status:400,headers:CORS}); }
  if (!query?.trim()) return new Response(JSON.stringify({error:'Falta query'}),{status:400,headers:CORS});

  const q = query.trim();
  const [r1,r2,r3,r4] = await Promise.allSettled([
    ddgSearch(`"${q}" filetype:pdf`),                          // PDFs directos en cualquier sitio
    ddgSearch(`"${q}" libgen OR "annas-archive" pdf`),         // Libgen/Anna via DDG
    searchAnnas(q),
    searchLibgen(q),
  ]);

  const seen = new Set();
  const libros = [];
  for (const r of [r1,r2,r3,r4]) {
    if (r.status==='fulfilled' && Array.isArray(r.value)) {
      for (const l of r.value) {
        const key = l.md5 || l.dlUrl || '';
        if (key && !seen.has(key)) { seen.add(key); libros.push(l); }
      }
    }
  }

  return new Response(JSON.stringify({libros}),{headers:CORS});
}

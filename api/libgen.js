const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const HDRS = {
  'User-Agent': UA,
  'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Connection': 'keep-alive',
};

// Intenta Anna's Archive (más accesible desde Vercel que Libgen)
async function searchAnnasArchive(query) {
  const url = `https://annas-archive.org/search?q=${encodeURIComponent(query)}&filetype=pdf`;
  const r = await fetch(url, { headers: HDRS, signal: AbortSignal.timeout(15000), redirect: 'follow' });
  if (!r.ok) throw new Error(`Anna status ${r.status}`);
  const html = await r.text();
  return parsearAnnas(html);
}

function parsearAnnas(html) {
  const libros = [];
  // Cada resultado tiene href="/md5/HASH"
  const re = /href="\/md5\/([a-f0-9]{32})"[^>]*>([\s\S]{0,1200}?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const md5 = m[1];
    const inner = m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    // Formato en corchetes: [PDF, 2.5MB] o [pdf, 1 MB]
    const fmtM = /\[(pdf|epub)[,\s]([^\]]*)\]/i.exec(inner);
    if (!fmtM) continue;
    const formato = fmtM[1].toUpperCase();
    const tamano = fmtM[2].trim();
    const beforeFmt = inner.substring(0, inner.search(/\[pdf|epub/i)).trim();
    // Separar título de autor: generalmente "Título Autor Año Idioma"
    const partes = beforeFmt.split(/(?<=.{10})\s{2,}/).filter(p=>p.trim());
    const titulo = partes[0] || '?';
    const resto = partes.slice(1).join(' ');
    const yearM = /\b(19|20)\d{2}\b/.exec(resto);
    const year = yearM ? yearM[0] : '';
    const langM = /\b(English|Spanish|German|French|Italian|Portuguese|Russian|Arabic)\b/i.exec(resto);
    const idioma = langM ? langM[1] : '';
    const autor = resto.replace(year,'').replace(idioma,'').replace(/[,\-]+\s*/g,' ').trim().split(/\s{2,}/)[0] || '';
    libros.push({ id: '0', titulo, autor, year, idioma, formato, tamano, paginas: '', md5 });
  }
  return libros;
}

// Libgen como alternativa (para IDs y metadatos más precisos)
async function searchLibgen(query) {
  const mirrors = ['libgen.rs', 'libgen.is', 'libgen.st', 'libgen.li'];
  for (const mirror of mirrors) {
    try {
      const url = `https://${mirror}/search.php?req=${encodeURIComponent(query)}&res=25&view=simple&column=def`;
      const r = await fetch(url, { headers: HDRS, signal: AbortSignal.timeout(12000), redirect: 'follow' });
      if (!r.ok) continue;
      const html = await r.text();
      if (html.length < 500) continue;
      const ids = extractIds(html);
      if (!ids.length) return [];
      // JSON API para metadatos
      const jr = await fetch(
        `https://${mirror}/json.php?ids=${ids.join(',')}&fields=id,title,author,md5,extension,filesize,language,year,pages`,
        { headers: HDRS, signal: AbortSignal.timeout(10000) }
      );
      const data = await jr.json();
      return (Array.isArray(data) ? data : [])
        .filter(l => l.md5 && ['pdf','epub'].includes((l.extension||'').toLowerCase()))
        .map(l => ({
          id: l.id, titulo: l.title||'?', autor: l.author||'',
          year: l.year||'', idioma: l.language||'',
          formato: (l.extension||'').toUpperCase(),
          tamano: fmtBytes(parseInt(l.filesize||0)),
          paginas: l.pages||'', md5: l.md5.toLowerCase(),
        }));
    } catch (e) {}
  }
  return null; // null = bloqueado completamente
}

function extractIds(html) {
  return [...new Set([...html.matchAll(/<td[^>]*>\s*(\d{3,})\s*<\/td>/g)].map(m=>m[1]))]
    .filter(id=>parseInt(id)>100).slice(0,40);
}

function fmtBytes(b) {
  if (!b) return '';
  if (b < 1048576) return Math.round(b/1024)+' KB';
  return (b/1048576).toFixed(1)+' MB';
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body || {};
  if (!query?.trim()) return res.status(400).json({ error: 'Falta query' });

  // 1. Intentar Anna's Archive
  try {
    const libros = await searchAnnasArchive(query.trim());
    if (libros.length) return res.json({ libros, fuente: 'annas' });
  } catch (e) {}

  // 2. Intentar Libgen
  try {
    const libros = await searchLibgen(query.trim());
    if (libros === null) return res.status(502).json({ error: 'blocked', libros: [] });
    return res.json({ libros: libros || [], fuente: 'libgen' });
  } catch (e) {}

  res.status(502).json({ error: 'blocked', libros: [] });
};

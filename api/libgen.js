const MIRRORS = [
  'libgen.is', 'libgen.rs', 'libgen.st', 'libgen.li',
  'gen.lib.rus.ec', 'libgen.lol', 'libgen.buzz',
];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
};

async function trySearch(query) {
  for (const mirror of MIRRORS) {
    try {
      const url = `https://${mirror}/search.php?req=${encodeURIComponent(query)}&res=50&view=simple&open=0&phrase=1&column=def`;
      const r = await fetch(url, {
        headers: HEADERS,
        signal: AbortSignal.timeout(14000),
        redirect: 'follow',
      });
      if (!r.ok) continue;
      const html = await r.text();
      if (html.length < 500) continue;
      const ids = extractIds(html);
      if (!ids.length) return { html, ids: [], mirror };
      return { html, ids, mirror };
    } catch (e) {}
  }
  return null;
}

function extractIds(html) {
  // Libgen ID is in the first <td> of each result row as a plain number
  const ids = [...new Set([...html.matchAll(/<td[^>]*>\s*(\d{3,})\s*<\/td>/g)].map(m => m[1]))];
  return ids.filter(id => parseInt(id) > 100).slice(0, 50);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body || {};
  if (!query?.trim()) return res.status(400).json({ error: 'Falta término de búsqueda' });

  const result = await trySearch(query.trim());
  if (!result) return res.status(502).json({ error: 'blocked', libros: [] });

  if (!result.ids.length) return res.json({ libros: [] });

  // Fetch JSON metadata for the found IDs using same mirror
  let libros = [];
  try {
    const fields = 'id,title,author,md5,extension,filesize,language,year,pages';
    const jsonUrl = `https://${result.mirror}/json.php?ids=${result.ids.join(',')}&fields=${fields}`;
    const jr = await fetch(jsonUrl, { headers: HEADERS, signal: AbortSignal.timeout(10000) });
    const data = await jr.json();
    libros = (Array.isArray(data) ? data : [])
      .filter(l => l.md5 && ['pdf', 'epub'].includes((l.extension || '').toLowerCase()))
      .map(l => ({
        id: l.id,
        titulo: l.title || 'Sin título',
        autor: l.author || '',
        year: l.year || '',
        idioma: l.language || '',
        formato: (l.extension || '').toUpperCase(),
        tamano: l.filesize ? fmtBytes(parseInt(l.filesize)) : '',
        paginas: l.pages || '',
        md5: l.md5.toLowerCase(),
      }));
  } catch (e) {}

  res.json({ libros });
};

function fmtBytes(b) {
  if (!b) return '';
  if (b < 1048576) return Math.round(b / 1024) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}

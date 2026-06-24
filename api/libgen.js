const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const MIRRORS = ['libgen.is', 'libgen.rs', 'libgen.st'];

async function fetchMirror(path, mirror) {
  return fetch(`https://${mirror}${path}`, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(12000),
  });
}

async function tryMirrors(path) {
  for (const mirror of MIRRORS) {
    try {
      const r = await fetchMirror(path, mirror);
      if (r.ok) return r;
    } catch (e) {}
  }
  throw new Error('No se pudo conectar con Libgen');
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body || {};
  if (!query?.trim()) return res.status(400).json({ error: 'Falta término de búsqueda' });

  try {
    // 1. Buscar y extraer IDs del HTML
    const searchPath = `/search.php?req=${encodeURIComponent(query)}&res=50&view=simple&open=0&phrase=1&column=def`;
    const searchResp = await tryMirrors(searchPath);
    const html = await searchResp.text();

    // Extraer IDs únicos de los links de resultado
    const ids = [...new Set([...html.matchAll(/\/book\/index\.php\?md5=|[?&]id=(\d+)/g)]
      .map(m => m[1]).filter(Boolean))].slice(0, 40);

    // Fallback: buscar IDs en la tabla de otra forma
    const ids2 = [...new Set([...html.matchAll(/<td>(\d{4,})<\/td>/g)]
      .map(m => m[1]))].slice(0, 40);

    const allIds = [...new Set([...ids, ...ids2])].slice(0, 40);
    if (!allIds.length) return res.json({ libros: [] });

    // 2. Obtener metadatos JSON con los IDs
    const fields = 'id,title,author,md5,extension,filesize,language,year,pages';
    const jsonPath = `/json.php?ids=${allIds.join(',')}&fields=${fields}`;
    const jsonResp = await tryMirrors(jsonPath);
    const data = await jsonResp.json();

    // 3. Filtrar y limpiar resultados
    const libros = (Array.isArray(data) ? data : [])
      .filter(l => l.md5 && ['pdf', 'epub'].includes((l.extension || '').toLowerCase()))
      .map(l => ({
        id: l.id,
        titulo: l.title || 'Sin título',
        autor: l.author || '',
        year: l.year || '',
        idioma: l.language || '',
        formato: (l.extension || '').toUpperCase(),
        tamano: l.filesize ? formatBytes(parseInt(l.filesize)) : '',
        paginas: l.pages || '',
        md5: l.md5.toLowerCase(),
      }));

    res.json({ libros });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};

function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

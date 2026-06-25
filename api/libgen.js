// Open Library API - siempre accesible desde Vercel
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query } = req.body || {};
  if (!query?.trim()) return res.status(400).json({ error: 'Falta query' });

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query.trim())}&limit=15&fields=key,title,author_name,first_publish_year,cover_i,isbn,language`;
    const r = await fetch(url, {
      headers: { 'User-Agent': 'FrigursoLector/1.0 (educational app)' },
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return res.status(502).json({ error: 'Open Library error' });
    const data = await r.json();

    const libros = (data.docs || []).map(doc => ({
      titulo: doc.title || '',
      autor: (doc.author_name || []).slice(0, 2).join(', '),
      year: doc.first_publish_year || '',
      cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
      isbn: (doc.isbn || [])[0] || '',
      key: doc.key || '',
    })).filter(l => l.titulo);

    res.json({ libros });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};

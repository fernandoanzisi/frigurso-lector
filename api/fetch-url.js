module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Falta URL' });

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'URL inválida' });
  }

  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LectorBot/1.0)' },
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) return res.status(502).json({ error: `La página devolvió error ${resp.status}` });

    const html = await resp.text();

    // Extraer título
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : 'Página web';

    // Eliminar scripts, estilos, nav, footer, header, aside
    let text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<aside[\s\S]*?<\/aside>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Dividir en páginas de ~2500 caracteres cortando en párrafos
    const CHARS_PER_PAGE = 2500;
    const pages = [];
    let remaining = text;
    while (remaining.length > 0) {
      if (remaining.length <= CHARS_PER_PAGE) {
        pages.push(remaining.trim());
        break;
      }
      let cut = remaining.lastIndexOf('\n', CHARS_PER_PAGE);
      if (cut < CHARS_PER_PAGE * 0.5) cut = remaining.lastIndexOf(' ', CHARS_PER_PAGE);
      if (cut < 1) cut = CHARS_PER_PAGE;
      pages.push(remaining.slice(0, cut).trim());
      remaining = remaining.slice(cut).trim();
    }

    return res.status(200).json({ title, pages: pages.filter(p => p.length > 10) });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

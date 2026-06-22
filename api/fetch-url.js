module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, charsPerPage } = req.body;
  if (!url) return res.status(400).json({ error: 'Falta URL' });
  const CHARS_PER_PAGE = (charsPerPage && charsPerPage > 200 && charsPerPage < 5000) ? charsPerPage : 900;

  try { new URL(url); } catch { return res.status(400).json({ error: 'URL inválida' }); }

  if (/\.pdf(\?|$)/i.test(url)) {
    return res.status(400).json({ error: 'Es un PDF — usá el tab 📄 PDF para importarlo correctamente' });
  }

  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LectorBot/1.0)' },
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) return res.status(502).json({ error: `La página devolvió error ${resp.status}` });

    let html = await resp.text();
    const baseUrl = new URL(url);

    // Extraer título
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : 'Página web';

    // Eliminar bloques de navegación/ui antes de procesar
    html = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<aside[\s\S]*?<\/aside>/gi, '');

    // Convertir imágenes en marcadores [[IMG:url|alt]] antes de eliminar tags
    html = html.replace(/<img[^>]+>/gi, match => {
      // Buscar src (también data-src para lazy loading)
      const srcMatch = match.match(/(?:data-src|src)=["']([^"']+)["']/i);
      if (!srcMatch) return '';
      const altMatch = match.match(/alt=["']([^"']*)["']/i);
      try {
        const absUrl = new URL(srcMatch[1], baseUrl).href;
        if (!absUrl.startsWith('http')) return '';
        // Ignorar imágenes tracking/pixel/icono por tamaño o nombre
        if (/pixel|tracking|analytics|icon|logo|avatar|badge|button/i.test(absUrl)) return '';
        const alt = (altMatch ? altMatch[1] : '').trim();
        return `\n[[IMG:${absUrl}|${alt}]]\n`;
      } catch { return ''; }
    });

    // Ahora eliminar el resto de tags HTML
    let text = html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Dividir en páginas adaptadas al tamaño de pantalla del cliente
    const pages = [];
    let remaining = text;
    while (remaining.length > 0) {
      if (remaining.length <= CHARS_PER_PAGE) {
        pages.push(remaining.trim());
        break;
      }
      // No cortar dentro de un marcador de imagen
      let limit = CHARS_PER_PAGE;
      const imgStart = remaining.indexOf('[[IMG:', limit - 200);
      const imgEnd = remaining.indexOf(']]', limit);
      if (imgStart !== -1 && imgStart < limit && imgEnd !== -1) {
        // Hay una imagen que empieza antes del corte — incluirla completa
        limit = imgEnd + 2;
      }
      let cut = remaining.lastIndexOf('\n', limit);
      if (cut < limit * 0.5) cut = remaining.lastIndexOf(' ', limit);
      if (cut < 1) cut = limit;
      pages.push(remaining.slice(0, cut).trim());
      remaining = remaining.slice(cut).trim();
    }

    return res.status(200).json({ title, pages: pages.filter(p => p.length > 10) });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

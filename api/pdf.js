module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Falta URL' });

  try { new URL(url); } catch { return res.status(400).json({ error: 'URL inválida' }); }

  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LectorBot/1.0)' },
      signal: AbortSignal.timeout(25000),
    });
    if (!resp.ok) return res.status(502).json({ error: `El servidor devolvió error ${resp.status}` });

    const buffer = await resp.arrayBuffer();
    // Verificar que empiece con la firma de PDF (%PDF)
    const header = Buffer.from(buffer.slice(0, 4)).toString('ascii');
    if (!header.startsWith('%PDF')) {
      return res.status(400).json({ error: 'El archivo descargado no es un PDF válido' });
    }
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(buffer));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

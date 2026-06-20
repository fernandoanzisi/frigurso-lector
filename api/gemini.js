module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });

  try {
    const { image, mimeType, hint } = req.body;
    if (!image) return res.status(400).json({ error: 'Falta imagen (base64)' });

    const prompt = hint ||
      'Extraé todo el texto de esta imagen exactamente como aparece. ' +
      'Conservá los párrafos, los saltos de línea entre párrafos y la puntuación. ' +
      'No agregues nada, no resumas, solo transcribí el texto tal cual está escrito. ' +
      'Si hay números de página, títulos o encabezados incluílos también.';

    const body = {
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeType || 'image/jpeg', data: image } }
        ]
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 4096 }
    };

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(resp.status).json({ error: 'Gemini error: ' + err.slice(0, 200) });
    }

    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.status(200).json({ text });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

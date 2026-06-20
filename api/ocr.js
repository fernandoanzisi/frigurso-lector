module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OCR_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OCR_API_KEY no configurada' });

  try {
    const { image, mimeType, language } = req.body;
    if (!image) return res.status(400).json({ error: 'Falta imagen (base64)' });

    const langMap = {
      'español': 'spa', 'inglés': 'eng', 'portugués': 'por',
      'francés': 'fre', 'alemán': 'ger', 'italiano': 'ita',
    };
    const ocrLang = langMap[language] || 'spa';

    const params = new URLSearchParams();
    params.append('apikey', apiKey);
    params.append('base64Image', `data:${mimeType || 'image/jpeg'};base64,${image}`);
    params.append('language', ocrLang);
    params.append('isOverlayRequired', 'false');
    params.append('detectOrientation', 'true');
    params.append('scale', 'true');

    const resp = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: params,
    });

    const data = await resp.json();
    if (data.IsErroredOnProcessing) {
      return res.status(500).json({ error: data.ErrorMessage?.[0] || 'Error en OCR' });
    }

    const text = data.ParsedResults?.[0]?.ParsedText || '';
    return res.status(200).json({ text });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

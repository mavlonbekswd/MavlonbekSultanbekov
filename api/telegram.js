import axios from 'axios';

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
  const suppliedSecret = req.headers['x-sanity-webhook-secret'];

  if (!webhookSecret) {
    return res.status(503).json({ message: 'Webhook is not configured' });
  }

  if (suppliedSecret !== webhookSecret) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const documentId = req.body?.ids?.[0];
  if (typeof documentId !== 'string' || !documentId.trim()) {
    return res.status(400).json({ message: 'Document ID is required' });
  }

  const {
    SANITY_PROJECT_ID: projectId,
    SANITY_DATASET: dataset = 'production',
    TELEGRAM_BOT_TOKEN: botToken,
    TELEGRAM_CHAT_ID: chatId,
  } = process.env;

  if (!projectId || !botToken || !chatId) {
    return res.status(503).json({ message: 'Webhook is not configured' });
  }

  const query =
    '*[_id == $documentId][0]{ uzTitle, uzContent, "mainImageUrl": mainImage.asset->url }';
  const sanityUrl = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}`;

  try {
    const sanityResponse = await axios.get(sanityUrl, {
      params: {
        query,
        $documentId: JSON.stringify(documentId),
      },
    });
    const post = sanityResponse.data.result;

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const contentText = Array.isArray(post.uzContent)
      ? post.uzContent
          .map((block) =>
            block?.children?.map((child) => child.text).join(''),
          )
          .filter(Boolean)
          .join('\n')
      : typeof post.uzContent === 'string'
        ? post.uzContent
        : '';
    const text = `<b>${escapeHtml(post.uzTitle)}</b>\n\n${escapeHtml(contentText)}\n\n<b>Ko'proq ko'rish uchun:</b> mavlonbek.com`;
    const telegramUrl = `https://api.telegram.org/bot${botToken}`;

    if (post.mainImageUrl) {
      await axios.post(`${telegramUrl}/sendPhoto`, {
        chat_id: chatId,
        photo: post.mainImageUrl,
        caption: text,
        parse_mode: 'HTML',
      });
    } else {
      await axios.post(`${telegramUrl}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      });
    }

    return res.status(200).json({ message: 'Post sent' });
  } catch {
    return res.status(502).json({ message: 'Upstream request failed' });
  }
}

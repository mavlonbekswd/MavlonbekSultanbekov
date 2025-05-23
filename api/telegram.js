import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { body } = req;
  const documentId = body?.ids?.[0];

  if (!documentId) {
    return res.status(400).json({ message: "Document ID topilmadi" });
  }

  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "5a03o7rz";
  const SANITY_DATASET = process.env.SANITY_DATASET || "production";
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const query = `*[_id == "${documentId}"][0]{ uzTitle, uzContent, "mainImageUrl": mainImage.asset->url }`;
  const encodedQuery = encodeURIComponent(query);
  const sanityURL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/data/query/${SANITY_DATASET}?query=${encodedQuery}`;

  try {
    const sanityRes = await axios.get(sanityURL);
    const post = sanityRes.data.result;

    if (post) {
      let contentText = "";
      if (Array.isArray(post.uzContent)) {
        contentText = post.uzContent.map(block =>
          block?.children?.map(child => child.text).join("") || ""
        ).join("\n");
      } else if (typeof post.uzContent === "string") {
        contentText = post.uzContent;
      }

      const text = `<b>${post.uzTitle}</b>\n\n${contentText}\n\n<b>Ko'proq ko'rish uchun:</b> mavlonbek.com`;
      const telegramURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

      if (post.mainImageUrl) {
        await axios.post(`${telegramURL}/sendPhoto`, {
          chat_id: TELEGRAM_CHAT_ID,
          photo: post.mainImageUrl,
          caption: text,
          parse_mode: "HTML",
        });
      } else {
        await axios.post(`${telegramURL}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        });
      }

      return res.status(200).json({ message: "Telegramga yuborildi!" });
    } else {
      return res.status(404).json({ message: "Post topilmadi" });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ message: "Serverda xatolik" });
  }
}
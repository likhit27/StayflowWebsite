// api/notion.js
// Vercel serverless function — runs server-side, no CORS issues
// Called by the frontend at /api/notion

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const NOTION_TOKEN = process.env.VITE_NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: 'Notion credentials not configured on server.' });
  }

  const { name, company, mobile, email, date, time, tag } = req.body;

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name:             { title:      [{ text: { content: name } }] },
          Company:          { rich_text:  [{ text: { content: company } }] },
          Mobile:           { phone_number: mobile },
          Email:            { email:      email },
          'Preferred Date': { date:       { start: date } },
          'Time Slot':      { select:     { name: time } },
          Tag:              { select:     { name: tag } },
        },
      }),
    });

    const data = await notionRes.json();

    if (!notionRes.ok) {
      console.error('Notion error:', data);
      return res.status(notionRes.status).json({ error: data.message || 'Notion API error' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

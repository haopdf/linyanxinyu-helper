// 文章阅读量统计 API
// 使用 Vercel KV 存储，未配置时返回静态数据

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: '缺少文章 ID' });
  }

  const key = `article:view:${id}`;

  try {
    // 尝试使用 Vercel KV
    const { kv } = await import('@vercel/kv');

    if (req.method === 'POST') {
      // 增加阅读量
      const views = await kv.incr(key);
      return res.status(200).json({ id, views });
    } else {
      // 获取阅读量
      const views = (await kv.get(key)) || 0;
      return res.status(200).json({ id, views });
    }
  } catch (e) {
    // KV 未配置或出错，返回静态数据
    console.log('Vercel KV 未配置，返回静态阅读量');

    // 静态阅读量数据（与 articles.json 中的 views 对应）
    const staticViews = {
      'communication-5-methods': 1234,
      'learning-5-reasons': 2156,
      'emotion-5-steps': 987,
      'digital-7-methods': 3421,
      'adolescence-7-principles': 1567,
      'family-self-growth': 876,
      'special-bullying': 2345,
      'growth-eq-guide': 1876
    };

    const views = staticViews[id] || 0;

    if (req.method === 'POST') {
      // POST 时返回 +1 的模拟值
      return res.status(200).json({ id, views: views + 1, note: 'KV 未配置，阅读量未真实增加' });
    } else {
      return res.status(200).json({ id, views, note: 'KV 未配置，使用静态数据' });
    }
  }
}

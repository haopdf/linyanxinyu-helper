// 文章点赞 API
// 使用 Vercel KV 存储，未配置时返回静态数据
// 使用 localStorage 防止重复点赞（前端控制）

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

  const key = `article:like:${id}`;

  try {
    // 尝试使用 Vercel KV
    const { kv } = await import('@vercel/kv');

    if (req.method === 'POST') {
      // 增加点赞数
      const likes = await kv.incr(key);
      return res.status(200).json({ id, likes, liked: true });
    } else {
      // 获取点赞数
      const likes = (await kv.get(key)) || 0;
      return res.status(200).json({ id, likes });
    }
  } catch (e) {
    // KV 未配置或出错，返回静态数据
    console.log('Vercel KV 未配置，返回静态点赞数');

    // 静态点赞数数据
    const staticLikes = {
      'communication-5-methods': 86,
      'learning-5-reasons': 124,
      'emotion-5-steps': 67,
      'digital-7-methods': 198,
      'adolescence-7-principles': 105,
      'family-self-growth': 58,
      'special-bullying': 143,
      'growth-eq-guide': 92
    };

    const likes = staticLikes[id] || 0;

    if (req.method === 'POST') {
      // POST 时返回 +1 的模拟值
      return res.status(200).json({ id, likes: likes + 1, liked: true, note: 'KV 未配置，点赞数未真实增加' });
    } else {
      return res.status(200).json({ id, likes, note: 'KV 未配置，使用静态数据' });
    }
  }
}

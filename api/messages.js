// 留言板 API
// GET /api/messages - 获取留言列表
// POST /api/messages - 提交新留言

export default async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 尝试导入 Vercel KV
    let kv = null;
    try {
      const { kv: kvStore } = await import('@vercel/kv');
      kv = kvStore;
    } catch (e) {
      console.log('Vercel KV not available:', e.message);
    }

    if (req.method === 'GET') {
      // 获取留言列表
      let messages = [];
      if (kv) {
        messages = await kv.lrange('linyanxinyu:messages', 0, 99) || [];
      } else {
        // KV 未配置时返回示例数据
        messages = [
          {
            id: 1,
            name: '一位妈妈',
            content: '林老师的文章太实用了！按照您说的方法和孩子沟通，关系确实改善了很多。',
            time: '2026-09-15 10:30'
          },
          {
            id: 2,
            name: '初中生家长',
            content: '孩子青春期叛逆，看了您的文章后才明白是自己的方法不对，感谢分享！',
            time: '2026-09-14 15:20'
          }
        ];
      }
      return res.status(200).json({ success: true, messages });
    }

    if (req.method === 'POST') {
      // 提交新留言
      const { name, content } = req.body || {};

      // 验证
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ success: false, message: '留言内容不能为空' });
      }
      if (content.length > 500) {
        return res.status(400).json({ success: false, message: '留言内容不能超过500字' });
      }

      const message = {
        id: Date.now(),
        name: (name && name.trim()) ? name.trim().substring(0, 20) : '匿名家长',
        content: content.trim().substring(0, 500),
        time: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      if (kv) {
        // 存储到 KV，最新的在最前面
        await kv.lpush('linyanxinyu:messages', JSON.stringify(message));
        // 只保留最近 100 条
        await kv.ltrim('linyanxinyu:messages', 0, 99);
      } else {
        console.log('KV not configured, message not saved:', message);
        return res.status(500).json({
          success: false,
          message: '留言功能暂未启用，请稍后再试'
        });
      }

      return res.status(200).json({ success: true, message });
    }

    return res.status(405).json({ success: false, message: '方法不允许' });
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ success: false, message: '服务器错误' });
  }
}

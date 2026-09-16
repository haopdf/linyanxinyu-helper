# 林燕心语 · 青春期心理与家庭教育网站

杭州一线初中教师林燕的育儿心得分享平台，专注青春期心理、亲子沟通、学习动力、情绪管理。

> **教育理念**：先懂孩子，再谈教育；关系先于教育，身教重于言传。

## 🌐 在线访问

- **生产环境**：https://linyanxinyu-helper-9qgocekfd-asincc-4762s-projects.vercel.app
- **GitHub 仓库**：https://github.com/haopdf/linyanxinyu-helper

## 🌟 功能特性

### 内容展示
- **8大内容分类**：亲子沟通、青春期、学习动力、情绪管理、手机沉迷、家庭教育、特殊问题、心理成长
- **文章详情页**：每篇文章独立详情页，支持阅读量、标签、相关文章推荐
- **文章数据 JSON 化**：`data/articles.json` 统一管理文章内容，方便扩展
- **实时搜索**：首页和文章列表页均支持文章标题搜索
- **分类独立页面**：点击分类跳转到 `articles.html?cat=xxx`，支持分享和收藏

### 互动功能
- **留言板**：读者可在线留言，支持昵称（选填）和内容（必填），使用 Vercel KV 存储
- **分享引导**：文章详情页支持分享引导（微信内点击右上角分享）
- **热门关键词**：首页展示热门关键词，点击即可搜索

### 微信公众号对接
- **15个关键词自动回复**：青春期、厌学、亲子沟通、手机沉迷、学习动力、情绪管理、叛逆、考试焦虑、自卑、早恋、家庭教育、父母关系、校园欺凌、抑郁、帮助
- **消息回调**：支持微信公众号消息接收和自动回复
- **菜单同步**：支持公众号菜单自动同步（需配置 AppID/AppSecret）

### 技术特性
- **暖橙色主题**：温暖、亲切、治愈的视觉风格，支持暗色模式
- **SEO 优化**：完整的 meta 标签、Open Graph、sitemap.xml、robots.txt
- **移动端优先**：响应式设计，完美适配手机、平板、桌面
- **CMS 后台**：可视化内容管理，支持文章、分类、关键词的增删改查
- **Vercel Blob 存储**：关键词数据独立存储，响应速度快

## 🛠️ 技术栈

- **前端**：原生 HTML/CSS/JavaScript（移动端优先，无框架依赖）
- **后端**：Node.js + Vercel Serverless Functions
- **数据**：JSON 文件 + Vercel Blob + Vercel KV
- **部署**：Vercel（自动部署，推送 GitHub 即触发）
- **版本控制**：Git + GitHub

## 📁 项目结构

```
linyanxinyu-helper/
├── api/                          # Vercel Serverless Functions
│   ├── wechat.js                # 微信公众号回调接口（关键词回复、菜单同步）
│   ├── content.js               # CMS 内容管理 API
│   ├── messages.js              # 留言板 API（GET 获取列表，POST 提交留言）
│   ├── chat.js                  # AI 聊天接口
│   ├── news.js                  # 新闻接口
│   └── ...
├── admin/                        # CMS 后台管理页面
│   └── index.html
├── css/
│   └── style.css                # 主样式文件（暖橙色主题，支持暗色模式）
├── js/
│   ├── app.js                   # 前端交互脚本
│   └── analytics.js             # 统计分析脚本
├── data/
│   ├── cms.json                 # CMS 数据（分类、关键词、菜单等）
│   ├── articles.json            # 文章数据（统一管理文章内容）
│   ├── services.json            # 服务数据
│   └── stats.json               # 统计数据
├── scripts/
│   ├── update_keywords.py       # 关键词一键更新脚本
│   ├── sync-keywords-to-blob.js # 同步关键词到 Vercel Blob
│   ├── migrate-to-cms.js        # 迁移到 CMS
│   └── keyword_articles.json    # 关键词文章配置
├── images/
│   ├── qrcode.jpg               # 公众号二维码
│   └── promo/                   # 推广图片
├── index.html                   # 首页（Hero + 分类 + 热门关键词 + 文章列表 + 关于 + 关注 + 留言）
├── articles.html                # 文章列表页（支持分类筛选 ?cat=xxx 和搜索 ?search=xxx）
├── article.html                 # 文章详情页（通过 ?id=xxx 加载文章）
├── 404.html                     # 404 页面
├── sitemap.xml                  # SEO 站点地图
├── robots.txt                   # 爬虫规则
├── manifest.json                # PWA 清单
├── package.json
├── vercel.json
├── .env.example                 # 环境变量示例
└── README.md
```

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone git@github.com:haopdf/linyanxinyu-helper.git
cd linyanxinyu-helper

# 安装依赖
npm install

# 本地运行（需要安装 vercel CLI）
npx vercel dev
```

### 部署到 Vercel

项目已配置为推送 GitHub 自动部署。手动部署步骤：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目（或已连接则自动部署）
3. 配置环境变量（见下方）

## ⚙️ 环境变量配置

在 Vercel 项目后台 → Settings → Environment Variables 中配置：

| 变量名 | 说明 | 是否必填 |
|--------|------|---------|
| `WECHAT_TOKEN` | 微信公众号签名验证 Token | 是（公众号对接） |
| `WX_APPID` | 微信公众号 AppID | 否（菜单同步需要） |
| `WX_SECRET` | 微信公众号 AppSecret | 否（菜单同步需要） |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 读写 Token | 否（关键词存储需要） |
| `CMS_ADMIN_PASSWORD` | CMS 后台管理密码 | 否（后台管理需要） |

### Vercel KV 配置（留言板功能需要）

留言板功能使用 Vercel KV 存储留言，需要配置：

1. 打开 Vercel 项目后台 → **Storage**
2. 点击 **Create Database** → 选择 **KV**
3. 数据库名称随便填（如 `linyanxinyu-kv`），地区选就近的
4. 创建后，环境变量会自动添加：
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
5. 重新部署即可生效

> 未配置 KV 时，留言板 GET 返回示例数据，POST 返回"留言功能暂未启用"提示。

## 💬 微信公众号配置

### 服务器配置

在微信公众号后台 → 设置与开发 → 基本配置 → 服务器配置：

- **URL**：`https://your-domain.vercel.app/api/wechat`
- **Token**：与 `WECHAT_TOKEN` 环境变量一致
- **消息加解密方式**：明文模式或兼容模式
- **EncodingAESKey**：随机生成（使用兼容模式时需要）

### 关键词回复

关键词数据存储在 `data/cms.json` 的 `wechatKeywords` 字段，支持：

- **精确匹配**：用户输入与 keyword 完全一致
- **同义词匹配**：用户输入在 aliases 列表中
- **包含匹配**：用户输入包含 keyword

回复类型：
- `text`：纯文本回复
- `news`：图文回复（标题、描述、图片、链接）

### 更新关键词

```bash
# 编辑关键词配置
vim scripts/keyword_articles.json

# 一键更新（生成HTML + 更新cms.json + 同步Vercel Blob）
BLOB_READ_WRITE_TOKEN=your_token python3 scripts/update_keywords.py
```

## 📝 如何添加新文章

### 方法一：直接编辑 JSON（推荐）

1. 打开 `data/articles.json`
2. 在 `articles` 数组中添加新文章对象：

```json
{
  "id": "article-unique-id",
  "title": "文章标题",
  "category": "communication",
  "categoryName": "亲子沟通",
  "excerpt": "文章摘要，120字以内",
  "date": "2026-09-16",
  "readTime": "8分钟",
  "views": 0,
  "tags": ["标签1", "标签2"],
  "content": "<p>文章正文，HTML格式</p>"
}
```

3. 在 `index.html` 和 `articles.html` 的文章列表中添加对应的卡片（链接指向 `article.html?id=article-unique-id`）
4. 在 `sitemap.xml` 中添加新文章的 URL
5. 提交并推送代码，Vercel 自动部署

### 方法二：使用 CMS 后台

访问 `/admin/index.html`，使用 CMS 后台可视化管理文章（需要配置 `CMS_ADMIN_PASSWORD`）。

### 文章分类 ID 对照表

| 分类 ID | 名称 | 描述 |
|---------|------|------|
| `communication` | 💬 亲子沟通 | 如何与孩子有效沟通，建立亲密关系 |
| `adolescence` | 🌱 青春期心理 | 青春期孩子心理特点、叛逆、早恋等 |
| `learning` | 📚 学习动力 | 如何激发孩子学习内驱力，应对厌学 |
| `emotion` | 😊 情绪管理 | 孩子情绪管理、心理健康、压力应对 |
| `digital` | 📱 手机沉迷 | 孩子沉迷手机游戏、网络成瘾的应对 |
| `family` | 🏠 家庭教育 | 家庭教育理念、父母成长、家庭关系 |
| `special` | ⚠️ 特殊问题 | 校园欺凌、自伤、自杀等特殊问题应对 |
| `growth` | 🌳 心理成长 | 孩子心理健康、人格发展、人际关系 |

## 🎨 主题定制

主题色通过 CSS 变量定义，在 `css/style.css` 的 `:root` 中修改：

```css
:root {
  --primary: #f97316;        /* 主色：暖橙 */
  --primary-light: #fb923c;  /* 浅橙 */
  --primary-dark: #ea580c;   /* 深橙 */
  --secondary: #ec4899;      /* 辅助色：柔粉 */
  --accent: #fbbf24;         /* 强调色：米黄 */
  --bg: #fff7ed;              /* 背景色：暖米 */
  --text-primary: #1f2937;   /* 主文字色 */
  --text-secondary: #4b5563; /* 次文字色 */
  --text-muted: #9ca3af;     /* 弱化文字色 */
  --border: #fde68a;         /* 边框色 */
  --radius: 12px;             /* 圆角 */
  --shadow: 0 4px 12px rgba(249, 115, 22, 0.1); /* 阴影 */
}
```

暗色模式变量在 `@media (prefers-color-scheme: dark)` 中定义。

## 🔍 SEO 优化

项目已配置完整的 SEO 优化：

- **Meta 标签**：每个页面都有独立的 title、description、keywords
- **Open Graph**：支持社交分享时的标题、描述、类型
- **sitemap.xml**：包含所有页面和文章的站点地图
- **robots.txt**：搜索引擎爬虫规则
- **语义化 HTML**：使用 header、main、article、footer 等语义化标签
- **移动端适配**：viewport meta 标签，响应式设计

提交网站到搜索引擎：
- **Google Search Console**：https://search.google.com/search-console
- **百度站长平台**：https://ziyuan.baidu.com

## 📊 多设备同步

项目使用 Git + GitHub 实现多设备同步：

### macOS
```bash
# 项目路径
cd ~/PycharmProjects/linyanxinyu-helper

# 拉取最新代码
git pull

# 提交并推送
git add -A
git commit -m "your message"
git push
```

### Windows
```bash
# 项目路径（需要先 clone）
cd D:\py-project\linyanxinyu-helper

# 克隆项目（首次）
git clone git@github.com:haopdf/linyanxinyu-helper.git D:\py-project\linyanxinyu-helper

# 拉取最新代码
git pull

# 提交并推送
git add -A
git commit -m "your message"
git push
```

## 🆘 心理援助热线

如果您或孩子正在经历心理危机，请及时寻求专业帮助：

- **全国心理援助热线**：400-161-9995（24小时免费）
- **北京心理危机研究与干预中心**：010-82951332
- **杭州市第七人民医院**：0571-85121516
- **希望24热线**：400-161-9995

## 📄 许可证

ISC License

## 👩‍🏫 关于林燕

杭州一线初中教师，从教15年，接触过上千个青春期孩子和家庭。

**教育理念**：先懂孩子，再谈教育；关系先于教育，身教重于言传。

**公众号**：林燕心语

**商务合作**：linyanxinyu@163.com

---

如果这个项目对你有帮助，欢迎给个 Star ⭐

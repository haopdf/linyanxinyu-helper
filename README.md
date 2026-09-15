# 林燕心语 · 青春期心理与家庭教育网站

杭州一线初中教师林燕的育儿心得分享平台，专注青春期心理、亲子沟通、学习动力、情绪管理。

## 🌟 功能特性

- **8大内容分类**：亲子沟通、青春期、学习动力、情绪管理、手机沉迷、家庭教育、特殊问题、心理成长
- **15个关键词自动回复**：青春期、厌学、亲子沟通、手机沉迷、学习动力、情绪管理、叛逆、考试焦虑、自卑、早恋、家庭教育、父母关系、校园欺凌、抑郁、帮助
- **暖橙色主题**：温暖、亲切、治愈的视觉风格
- **CMS后台**：可视化内容管理，支持文章、分类、关键词的增删改查
- **微信公众号对接**：自动回复、菜单同步、消息回调
- **Vercel Blob 存储**：关键词数据独立存储，响应速度快100倍

## 🛠️ 技术栈

- **前端**：原生 HTML/CSS/JavaScript（移动端优先）
- **后端**：Node.js + Vercel Serverless Functions
- **数据**：JSON 文件 + Vercel Blob
- **部署**：Vercel

## 📁 项目结构

```
linyanxinyu-helper/
├── api/                    # Vercel Serverless Functions
│   ├── wechat.js          # 微信公众号回调接口（关键词回复、菜单同步）
│   ├── content.js         # CMS 内容管理 API
│   └── ...
├── admin/                  # CMS 后台管理页面
├── articles/               # 文章 HTML 文件
├── css/
│   └── style.css          # 主样式文件（暖橙色主题）
├── js/
│   └── app.js             # 前端交互脚本
├── data/
│   └── cms.json           # CMS 数据（分类、关键词、菜单等）
├── scripts/
│   ├── update_keywords.py        # 关键词一键更新脚本
│   ├── sync-keywords-to-blob.js  # 同步关键词到 Vercel Blob
│   └── keyword_articles.json     # 关键词文章配置
├── index.html             # 首页
├── articles.html          # 文章列表页
├── package.json
├── vercel.json
└── README.md
```

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 本地运行（需要安装 vercel CLI）
npx vercel dev
```

### 部署到 Vercel

1. 将代码推送到 GitHub/Gitee
2. 在 Vercel 导入项目
3. 配置环境变量：
   - `WECHAT_TOKEN`：微信公众号签名验证 Token
   - `WX_APPID`：微信公众号 AppID（菜单同步可选）
   - `WX_SECRET`：微信公众号 AppSecret（菜单同步可选）
   - `BLOB_READ_WRITE_TOKEN`：Vercel Blob 读写 Token
   - `CMS_ADMIN_PASSWORD`：CMS 后台管理密码

## 💬 微信公众号配置

### 服务器配置

- URL：`https://your-domain.vercel.app/api/wechat`
- Token：与 `WECHAT_TOKEN` 环境变量一致
- 消息加解密方式：明文模式或兼容模式

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

## 🎨 主题定制

主题色通过 CSS 变量定义，在 `css/style.css` 的 `:root` 中修改：

```css
:root {
  --primary: #f97316;        /* 主色：暖橙 */
  --primary-light: #fb923c;  /* 浅橙 */
  --primary-dark: #ea580c;   /* 深橙 */
  --secondary: #ec4899;      /* 辅助色：柔粉 */
  --accent: #fbbf24;         /* 强调色：米黄 */
  /* ... */
}
```

## 📝 内容分类

| 分类 ID | 名称 | 描述 |
|---------|------|------|
| communication | 💬 亲子沟通 | 如何与孩子有效沟通，建立亲密关系 |
| adolescence | 🌱 青春期心理 | 青春期孩子心理特点、叛逆、早恋等 |
| learning | 📚 学习动力 | 如何激发孩子学习内驱力，应对厌学 |
| emotion | 😊 情绪管理 | 孩子情绪管理、心理健康、压力应对 |
| digital | 📱 手机沉迷 | 孩子沉迷手机游戏、网络成瘾的应对 |
| family | 🏠 家庭教育 | 家庭教育理念、父母成长、家庭关系 |
| special | ⚠️ 特殊问题 | 校园欺凌、自伤、自杀等特殊问题应对 |
| growth | 🌳 心理成长 | 孩子心理健康、人格发展、人际关系 |

## 🆘 心理援助热线

如果您或孩子正在经历心理危机，请及时寻求专业帮助：

- **全国心理援助热线**：400-161-9995（24小时免费）
- **北京心理危机研究与干预中心**：010-82951332
- **杭州市第七人民医院**：0571-85121516

## 📄 许可证

ISC License

## 👩‍🏫 关于林燕

杭州一线初中教师，从教15年，接触过上千个青春期孩子和家庭。

**教育理念**：先懂孩子，再谈教育；关系先于教育，身教重于言传。

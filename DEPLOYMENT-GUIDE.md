# GitHub Pages 部署全流程指引

本指南将带你从零开始，完成博客站点的 GitHub 仓库创建、Pages 开启、自定义域名绑定，最终上线你的个人技术博客。

---

## 前提条件

- 已注册 GitHub 账号（如未注册，访问 https://github.com/signup）
- 已安装 Git（如未安装，访问 https://git-scm.com/downloads）
- 已下载本站点的完整文件包

---

## 第一步：修改站点配置

在上传之前，需要先修改配置文件中的个人信息。

### 1.1 编辑 `assets/js/config.js`

用文本编辑器打开 `assets/js/config.js`，修改以下字段：

```javascript
const SITE_CONFIG = {
    siteName: 'DevBlog',                    // ← 改成你的站点名称

    githubUsername: 'your-github-username', // ← 改成你的 GitHub 用户名
    repoName: 'your-repo-name',             // ← 改成你的仓库名

    useCustomDomain: false,                 // ← 如果用自定义域名，改为 true

    email: 'your@email.com',                // ← 改成你的邮箱

    posts: [
        // ... 文章列表
    ],

    projects: [
        // ... 项目列表，修改 demo 和 repo 链接
    ]
};
```

### 1.2 编辑 `about.md`

修改 `about.md` 中的个人信息、技术栈和联系方式。

### 1.3 编辑 `README.md`

修改 README 中的用户名和仓库名引用。

---

## 第二步：创建 GitHub 仓库

### 2.1 在 GitHub 上新建仓库

1. 登录 GitHub，点击右上角 **+** 号，选择 **New repository**

2. 填写仓库信息：
   - **Repository name**：输入仓库名（例如 `my-blog` 或 `blog`）
   - **Description**（可选）：`个人技术博客`
   - **Visibility**：选择 **Public**（GitHub Pages 免费版要求仓库为 Public）
   - **Initialize this repository with**：全部不勾选（不要添加 README/gitignore/license，因为我们已有文件）

3. 点击 **Create repository**

### 2.2 记下仓库地址

创建完成后，页面会显示仓库地址，格式类似：

```
https://github.com/你的用户名/你的仓库名.git
```

---

## 第三步：上传文件到仓库

### 方式 A：网页直接上传（适合不熟悉 Git 的用户）

1. 在仓库页面点击 **Add file → Upload files**

2. 将 `blog-site` 文件夹内的所有文件和文件夹拖入上传区域

   注意：需要上传的是 `blog-site` 文件夹**里面的内容**，不是 `blog-site` 文件夹本身。仓库根目录应该直接包含 `index.html`、`assets/`、`posts/` 等文件。

3. 在下方 **Commit changes** 处填写提交信息（例如 `Initial blog setup`）

4. 点击 **Commit changes** 提交

### 方式 B：使用 Git 命令行（推荐）

打开终端（Windows 用 Git Bash 或 PowerShell），执行以下命令：

```bash
# 1. 进入站点文件目录
cd /path/to/blog-site

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial blog setup"

# 5. 设置主分支名为 main
git branch -M main

# 6. 关联远程仓库（替换成你的地址）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 7. 推送到 GitHub
git push -u origin main
```

如果推送时提示输入账号密码：
- 用户名：你的 GitHub 用户名
- 密码：不能使用账号密码，需要使用 **Personal Access Token**（见下方说明）

### 获取 Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 勾选 **repo** 权限
4. 点击 **Generate token**
5. 复制生成的 token，在推送时作为密码使用

---

## 第四步：开启 GitHub Pages

1. 进入你的仓库页面：`https://github.com/你的用户名/你的仓库名`

2. 点击 **Settings**（仓库设置）

3. 在左侧菜单中找到 **Pages**

4. 在 **Build and deployment** 区域设置：
   - **Source**：选择 **Deploy from a branch**
   - **Branch**：
     - 分支选择 **main**
     - 文件夹选择 **/ (root)**
   - 点击 **Save**

5. 等待 1-2 分钟，页面顶部会显示你的站点地址：

   ```
   https://你的用户名.github.io/你的仓库名/
   ```

6. 点击该链接，即可看到你的博客站点

> 如果页面空白或样式丢失，请检查文件是否上传完整，特别是 `assets/css/` 和 `assets/js/` 目录。

---

## 第五步：验证站点功能

访问你的站点后，逐一检查以下功能：

- [ ] 首页正常显示文章列表
- [ ] 点击文章可以正常跳转并渲染 Markdown 内容
- [ ] 代码块有语法高亮
- [ ] 暗色/亮色模式切换正常
- [ ] 移动端响应式布局正常
- [ ] 项目页面正常显示
- [ ] 关于页面正常显示

---

## 第六步：绑定自定义域名（可选）

如果你有自己的域名（如 `blog.example.com`），可以按以下步骤绑定。

### 6.1 添加 CNAME 文件

在仓库根目录创建一个名为 `CNAME` 的文件（无扩展名），内容为你的域名：

```
blog.example.com
```

可以通过 GitHub 网页操作：
1. 点击 **Add file → Create new file**
2. 文件名输入 `CNAME`
3. 内容输入你的域名
4. 提交

### 6.2 在 Pages 设置中配置

1. 进入 **Settings → Pages**
2. 在 **Custom domain** 区域输入你的域名
3. 点击 **Save**
4. 勾选 **Enforce HTTPS**（建议等待 DNS 生效后再勾选）

### 6.3 修改 config.js

如果你使用了自定义域名，需要修改 `assets/js/config.js`：

```javascript
useCustomDomain: true,
```

这样站点的资源路径会从 `/仓库名/` 变为 `/`，确保正确加载。

### 6.4 配置 DNS 解析

在你的域名服务商（如 Cloudflare、阿里云、腾讯云等）添加 DNS 记录：

**方案一：子域名（如 blog.example.com）**

添加 CNAME 记录：

| 类型 | 名称 | 值 |
|------|------|------|
| CNAME | blog | 你的用户名.github.io |

**方案二：顶级域名（如 example.com）**

添加 A 记录，指向 GitHub Pages 的 IP：

| 类型 | 名称 | 值 |
|------|------|------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

> GitHub Pages 的 IP 地址可能会更新，最新地址请参考：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

### 6.5 等待 DNS 生效

DNS 生效通常需要几分钟到几小时不等。生效后：
- GitHub Pages 会自动为你申请 SSL 证书
- 证书申请完成后，**Enforce HTTPS** 可以勾选
- 访问 `https://blog.example.com` 即可看到你的站点

---

## 日常维护：如何新增文章

### 步骤

1. 在 `posts/` 目录下创建新的 `.md` 文件，例如 `posts/my-new-post.md`

2. 编辑 `assets/js/config.js`，在 `posts` 数组中添加新条目：

```javascript
{
    file: 'posts/my-new-post.md',
    title: '我的新文章标题',
    date: '2025-03-01',
    category: '前端',
    tags: ['JavaScript', '教程'],
    excerpt: '文章摘要，显示在首页卡片上...'
}
```

3. 提交并推送到 GitHub：

```bash
git add .
git commit -m "Add new post: 我的新文章标题"
git push
```

4. GitHub Pages 会自动更新，1-2 分钟后即可在新文章出现在首页

---

## 常见问题

### Q: 页面打开是空白？

检查 `config.js` 中的 `githubUsername` 和 `repoName` 是否正确。如果部署在 `用户名.github.io/仓库名/` 下，确保 `useCustomDomain` 为 `false`。

### Q: 文章点击后显示"加载失败"？

这是因为 GitHub Pages 对 `.md` 文件的 `Content-Type` 可能不正确。确保 `.md` 文件确实已上传到 `posts/` 目录，且 `config.js` 中的 `file` 路径正确。

### Q: 样式丢失 / CSS 没加载？

检查 `assets/css/style.css` 和 `assets/css/markdown.css` 是否已上传。如果是子路径部署（非自定义域名），确保 `useCustomDomain: false`。

### Q: 自定义域名访问 404？

1. 确认 `CNAME` 文件已在仓库根目录
2. 确认 DNS 记录已正确配置
3. 等待 DNS 生效（可能需要几小时）
4. 在 GitHub Settings → Pages 中检查域名状态

### Q: 如何删除示例文章？

删除 `posts/` 下对应的 `.md` 文件，同时从 `config.js` 的 `posts` 数组中移除对应条目即可。

---

## 文件结构说明

```
blog-site/
├── index.html              # 首页
├── article.html            # 文章详情页
├── projects.html           # 项目展示页
├── about.html              # 关于页
├── about.md                # 关于页 Markdown 内容
├── favicon.svg             # 站点图标
├── README.md               # 仓库说明
├── DEPLOYMENT-GUIDE.md     # 本部署文档
├── posts/                  # Markdown 文章目录
│   ├── hello-world.md
│   ├── css-design-system.md
│   ├── markdown-rendering.md
│   ├── git-workflow.md
│   └── api-design-notes.md
└── assets/
    ├── css/
    │   ├── style.css       # 主样式（含设计系统变量）
    │   └── markdown.css    # Markdown 渲染样式
    └── js/
        ├── config.js       # 站点配置（文章列表、项目列表）
        ├── main.js         # 首页逻辑
        ├── article.js      # 文章页逻辑
        ├── projects.js     # 项目页逻辑
        └── about.js        # 关于页逻辑
```

---

## 技术说明

- Markdown 渲染：[marked.js](https://github.com/markedjs/marked) v12.0.0
- 代码高亮：[highlight.js](https://highlightjs.org/) v11.9.0
- 无构建步骤，无 npm 依赖
- 纯静态 HTML/CSS/JS，直接托管
- 设计系统参考 HeroUI（Tailwind CSS v4）色彩方案

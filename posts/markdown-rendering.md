# 纯前端 Markdown 渲染方案

使用 marked.js + highlight.js 在浏览器端直接渲染 Markdown 文件，无需后端构建步骤，适合静态托管场景。

## 方案对比

| 方案 | 构建步骤 | 依赖 | 适用场景 |
|------|---------|------|---------|
| Hexo | 需要 Node.js | npm 包 | 传统博客 |
| Hugo | 需要 Go | 二进制 | 大型站点 |
| Jekyll | 需要 Ruby | gem | GitHub Pages 原生 |
| **纯前端渲染** | **无** | **CDN** | **轻量博客** |

## 核心实现

### 1. 引入依赖

通过 CDN 引入 `marked.js` 和 `highlight.js`，无需安装：

```html
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js"></script>
```

### 2. 配置 marked

```javascript
marked.setOptions({
    breaks: true,   // 换行符转 <br>
    gfm: true       // GitHub Flavored Markdown
});
```

### 3. 加载并渲染 Markdown

```javascript
function loadArticle(postFile) {
    fetch(postFile)
        .then(function(res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function(mdText) {
            var html = marked.parse(mdText);
            document.getElementById('article-content').innerHTML = html;

            // 代码高亮
            document.querySelectorAll('pre code').forEach(function(block) {
                hljs.highlightElement(block);
            });
        })
        .catch(function(err) {
            console.error('加载失败:', err);
        });
}
```

### 4. URL 参数路由

文章通过 URL 参数 `?p=posts/xxx.md` 指定：

```javascript
var params = new URLSearchParams(window.location.search);
var postFile = params.get('p');
```

用户点击文章卡片时，跳转到 `article.html?p=posts/xxx.md`。

## 文章清单管理

所有文章元信息存储在 `config.js` 中：

```javascript
posts: [
    {
        file: 'posts/hello-world.md',
        title: 'Hello World',
        date: '2025-01-15',
        category: '随笔',
        tags: ['GitHub Pages', 'Markdown'],
        excerpt: '从零开始搭建博客...'
    }
]
```

新增文章只需两步：
1. 在 `posts/` 目录下创建 `.md` 文件
2. 在 `config.js` 的 `posts` 数组中添加条目

## 代码高亮主题切换

暗色/亮色模式切换时，同步切换 highlight.js 的 CSS 主题：

```javascript
function updateHljsTheme(theme) {
    var link = document.getElementById('hljs-theme');
    link.href = theme === 'dark'
        ? '...styles/github-dark.min.css'
        : '...styles/github.min.css';
}
```

## 目录自动生成

渲染完成后，遍历所有 `h1/h2/h3` 标签生成目录：

```javascript
var headings = contentEl.querySelectorAll('h1, h2, h3');
headings.forEach(function(h, i) {
    h.id = 'heading-' + i;
    // 生成 TOC 链接...
});

// 滚动时高亮当前章节
window.addEventListener('scroll', function() {
    // 检测当前可见标题...
});
```

## 优势与局限

**优势：**
- 零构建，零依赖管理
- 文章源码即内容，所见即所得
- 部署极简，推到 GitHub 即可

**局限：**
- SEO 不如预渲染方案（内容在 JS 执行后才出现）
- 需要浏览器支持 `fetch()` 和 ES5+
- 文章增多后 `config.js` 需手动维护

对于个人技术博客而言，这些局限完全可以接受。

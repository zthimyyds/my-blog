# Hello World — 博客搭建记录

从零开始搭建一个托管在 GitHub Pages 上的个人技术博客站点，记录整体方案选型与实现思路。

## 为什么选择纯静态方案

在众多博客框架（Hexo、Hugo、Jekyll、VuePress 等）中，我最终选择了**纯静态 HTML/CSS/JS**方案，原因如下：

- **零构建步骤**：不需要安装 Node.js、Ruby 或 Go 环境，不需要 `npm install`，不需要等待构建
- **直接上传即用**：把文件推到 GitHub 仓库即可，GitHub Pages 自动托管
- **Markdown 渲染在前端完成**：使用 `marked.js` 在浏览器端解析 `.md` 文件，文章内容即是源码
- **极简依赖**：仅依赖 CDN 上的 `marked.js` 和 `highlight.js`，无任何 npm 包

## 技术架构

整体架构非常简单：

```
用户访问 index.html
    ↓
JS 读取 config.js 中的文章列表
    ↓
渲染文章卡片 + 侧边栏
    ↓
用户点击文章 → article.html?p=posts/xxx.md
    ↓
fetch() 加载 .md 文件 → marked.js 渲染 → highlight.js 高亮代码
```

## 设计系统

站点的视觉设计参考了 HeroUI 的设计语言：

| 设计元素 | 值 | 说明 |
|---------|------|------|
| 主色 | `hsl(212, 100%, 47%)` | 鲜亮蓝色 |
| 次色 | `hsl(270, 67%, 47%)` | 深紫色 |
| 圆角 | `8px / 12px / 14px` | 三级圆角系统 |
| 阴影 | 多层柔和投影 | 带暗色模式高光 |
| 字体 | 系统字体栈 + JetBrains Mono | 无外部字体依赖 |

## 暗色模式

通过 `data-theme` 属性切换主题，使用 CSS 自定义属性实现：

```css
:root {
    --color-background: hsl(0, 0%, 100%);
    --color-foreground: hsl(202, 24%, 9%);
}

[data-theme="dark"] {
    --color-background: hsl(0, 0%, 0%);
    --color-foreground: hsl(210, 6%, 93%);
}
```

用户偏好保存在 `localStorage` 中，首次访问时自动检测系统主题偏好。

## 下一步计划

- [ ] 添加文章搜索功能
- [ ] 支持 RSS 订阅
- [ ] 添加阅读进度条
- [ ] 优化 SEO 元信息

---

> 这只是开始。保持简洁，持续迭代。

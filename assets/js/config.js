/**
 * Site Configuration
 * Modify these values to customize your blog
 */

const SITE_CONFIG = {
    // Site name shown in navbar and footer
    siteName: 'DevBlog',

    // Your GitHub username (for repo links)
    githubUsername: 'zthimyyds',

    // Your repository name
    repoName: 'my-blog',

    // Whether deployed under a custom domain (true) or under username.github.io/repo-name (false)
    useCustomDomain: false,

    // Your email
    email: 'your@email.com',

    // Posts list manifest — each entry must have: file, title, date, category, tags, excerpt
    // Add new posts here, then create the .md file in the posts/ directory
    posts: [
        {
            file: 'posts/hello-world.md',
            title: 'Hello World — 博客搭建记录',
            date: '2025-01-15',
            category: '随笔',
            tags: ['GitHub Pages', 'Markdown', '前端'],
            excerpt: '从零开始搭建一个托管在 GitHub Pages 上的个人技术博客站点，记录整体方案选型与实现思路。'
        },
        {
            file: 'posts/css-design-system.md',
            title: '构建轻量级 CSS 设计系统',
            date: '2025-01-20',
            category: '前端',
            tags: ['CSS', '设计系统', '主题'],
            excerpt: '基于 CSS 自定义属性构建一套支持暗色模式的设计系统，涵盖颜色、圆角、阴影、间距等核心视觉令牌。'
        },
        {
            file: 'posts/markdown-rendering.md',
            title: '纯前端 Markdown 渲染方案',
            date: '2025-01-25',
            category: '前端',
            tags: ['Markdown', 'JavaScript', 'marked.js'],
            excerpt: '使用 marked.js + highlight.js 在浏览器端直接渲染 Markdown 文件，无需后端构建步骤，适合静态托管场景。'
        },
        {
            file: 'posts/git-workflow.md',
            title: 'Git 分支管理实践',
            date: '2025-02-01',
            category: '工具',
            tags: ['Git', '版本控制', '协作'],
            excerpt: '总结日常开发中的 Git 分支管理策略，包括 feature 分支、hotfix 流程、rebase 与 merge 的取舍。'
        },
        {
            file: 'posts/api-design-notes.md',
            title: 'RESTful API 设计要点',
            date: '2025-02-10',
            category: '后端',
            tags: ['API', 'REST', '设计'],
            excerpt: '梳理 RESTful API 设计中的关键原则：资源命名、HTTP 方法语义、状态码使用、分页与错误处理。'
        }
    ],

    // Projects list
    projects: [
        {
            name: '个人技术博客',
            description: '基于纯静态 HTML/CSS/JS 的 Markdown 博客系统，托管在 GitHub Pages 上，支持暗色模式与响应式布局。',
            tech: ['HTML', 'CSS', 'JavaScript', 'Markdown'],
            demo: 'https://zthimyyds.github.io/my-blog/',
            repo: 'https://github.com/zthimyyds/my-blog'
        },
        {
            name: '项目模板库',
            description: '收集整理前端项目快速启动模板，包含 Vite + React、Vue 3、纯静态等场景。',
            tech: ['Vite', 'React', 'Vue'],
            demo: '',
            repo: 'https://github.com/zthimyyds/project-templates'
        },
        {
            name: 'CLI 工具集',
            description: '日常开发中使用的命令行工具集合，包含文件处理、格式转换、批量操作等实用脚本。',
            tech: ['Node.js', 'Shell', 'CLI'],
            demo: '',
            repo: 'https://github.com/zthimyyds/cli-tools'
        }
    ]
};

// Helper: get base path for fetching resources
function getBasePath() {
    if (SITE_CONFIG.useCustomDomain) {
        return '/';
    }
    const path = window.location.pathname;
    // Handle both /index.html and /repo-name/index.html
    const parts = path.split('/');
    // If deployed under repo subpath, parts will be ['/', 'repo-name', 'index.html']
    if (parts.length >= 2 && parts[1] !== '' && parts[1] !== 'index.html' && parts[1] !== 'article.html' && parts[1] !== 'projects.html' && parts[1] !== 'about.html') {
        return '/' + parts[1] + '/';
    }
    return '/';
}

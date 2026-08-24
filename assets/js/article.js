/**
 * Article page logic
 * Reads ?p=posts/xxx.md from URL, fetches and renders the Markdown file
 */

(function () {
    'use strict';

    // ===== Theme Toggle =====
    initThemeToggle();

    // ===== Mobile Menu =====
    initMobileMenu();

    // ===== Load Article =====
    loadArticle();

    // ===== Functions =====

    function initThemeToggle() {
        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        var saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateHljsTheme(next);
        });
    }

    function updateHljsTheme(theme) {
        var link = document.getElementById('hljs-theme');
        if (link) {
            link.href = theme === 'dark'
                ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css'
                : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css';
        }
    }

    function initMobileMenu() {
        var btn = document.getElementById('mobile-menu-btn');
        var links = document.querySelector('.nav-links');
        if (!btn || !links) return;

        btn.addEventListener('click', function () {
            links.classList.toggle('open');
        });
    }

    function loadArticle() {
        var contentEl = document.getElementById('article-content');
        var tocEl = document.getElementById('article-toc');
        if (!contentEl) return;

        // Get post file from URL
        var params = new URLSearchParams(window.location.search);
        var postFile = params.get('p');

        if (!postFile) {
            contentEl.innerHTML = '<div class="error-message"><p>未指定文章，请返回<a href="index.html">首页</a>。</p></div>';
            return;
        }

        // Find post metadata
        var postMeta = null;
        for (var i = 0; i < SITE_CONFIG.posts.length; i++) {
            if (SITE_CONFIG.posts[i].file === postFile) {
                postMeta = SITE_CONFIG.posts[i];
                break;
            }
        }

        // Configure marked
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
        }

        // Fetch the markdown file
        var basePath = getBasePath();
        var fetchUrl = postFile.startsWith('http') ? postFile : (basePath + postFile);

        fetch(fetchUrl)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error('HTTP ' + res.status);
                }
                return res.text();
            })
            .then(function (mdText) {
                var html = '';
                if (typeof marked !== 'undefined') {
                    html = marked.parse(mdText);
                } else {
                    html = '<pre>' + escapeHtml(mdText) + '</pre>';
                }

                // Build meta header
                var metaHtml = '';
                if (postMeta) {
                    var tagsHtml = (postMeta.tags || []).map(function (t) {
                        return '<span class="post-tag">' + escapeHtml(t) + '</span>';
                    }).join('');

                    metaHtml = '<div class="article-meta">' +
                        '<h1 class="article-meta-title">' + escapeHtml(postMeta.title) + '</h1>' +
                        '<div class="article-meta-info">' +
                        '<span class="post-category">' + escapeHtml(postMeta.category || '未分类') + '</span>' +
                        '<span>' + escapeHtml(postMeta.date) + '</span>' +
                        '</div>' +
                        (tagsHtml ? '<div class="post-tags" style="margin-top:10px">' + tagsHtml + '</div>' : '') +
                        '</div>';
                }

                contentEl.innerHTML = metaHtml + '<div class="markdown-body">' + html + '</div>';

                // Highlight code blocks
                if (typeof hljs !== 'undefined') {
                    contentEl.querySelectorAll('pre code').forEach(function (block) {
                        hljs.highlightElement(block);
                    });
                }

                // Build TOC
                buildToc(contentEl, tocEl);
            })
            .catch(function (err) {
                contentEl.innerHTML = '<div class="error-message">' +
                    '<p>文章加载失败: ' + escapeHtml(err.message) + '</p>' +
                    '<p style="margin-top:12px"><a href="index.html">返回首页</a></p>' +
                    '</div>';
            });
    }

    function buildToc(contentEl, tocEl) {
        if (!tocEl) return;

        var headings = contentEl.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3');
        if (headings.length < 2) {
            tocEl.innerHTML = '';
            return;
        }

        var tocItems = [];
        headings.forEach(function (h, i) {
            var id = 'heading-' + i;
            h.id = id;
            var level = h.tagName.toLowerCase();
            var text = h.textContent || '';
            tocItems.push('<a href="#' + id + '" class="toc-link ' + level + '">' + escapeHtml(text) + '</a>');
        });

        tocEl.innerHTML = '<div class="toc-title">目录</div><div class="toc-list">' + tocItems.join('') + '</div>';

        // Active heading tracking
        var tocLinks = tocEl.querySelectorAll('.toc-link');
        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY + 100;
            var activeId = null;

            headings.forEach(function (h) {
                if (h.offsetTop <= scrollPos) {
                    activeId = h.id;
                }
            });

            tocLinks.forEach(function (link) {
                if (link.getAttribute('href') === '#' + activeId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
})();

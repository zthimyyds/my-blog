/**
 * Main page logic — home page
 * Loads post list, sidebar (categories, tags, archive)
 */

(function () {
    'use strict';

    // ===== Theme Toggle =====
    initThemeToggle();

    // ===== Mobile Menu =====
    initMobileMenu();

    // ===== Render Posts =====
    renderPosts();

    // ===== Render Sidebar =====
    renderSidebar();

    // ===== Functions =====

    function initThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        toggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateHljsTheme(next);
        });
    }

    function updateHljsTheme(theme) {
        const link = document.getElementById('hljs-theme');
        if (link) {
            link.href = theme === 'dark'
                ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css'
                : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css';
        }
    }

    function initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const links = document.querySelector('.nav-links');
        if (!btn || !links) return;

        btn.addEventListener('click', function () {
            links.classList.toggle('open');
        });
    }

    function renderPosts() {
        const grid = document.getElementById('posts-grid');
        const countEl = document.getElementById('post-count');
        if (!grid) return;

        const posts = SITE_CONFIG.posts;

        if (countEl) {
            countEl.textContent = `共 ${posts.length} 篇`;
        }

        if (posts.length === 0) {
            grid.innerHTML = '<div class="error-message"><p>暂无文章</p></div>';
            return;
        }

        // Sort by date descending
        const sorted = posts.slice().sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        grid.innerHTML = sorted.map(function (post) {
            var tagsHtml = (post.tags || []).map(function (t) {
                return '<span class="post-tag">' + escapeHtml(t) + '</span>';
            }).join('');

            return '<a class="post-card" href="article.html?p=' + encodeURIComponent(post.file) + '">' +
                '<div class="post-card-header">' +
                '<span class="post-category">' + escapeHtml(post.category || '未分类') + '</span>' +
                '<span class="post-date">' + escapeHtml(post.date) + '</span>' +
                '</div>' +
                '<h3 class="post-title">' + escapeHtml(post.title) + '</h3>' +
                '<p class="post-excerpt">' + escapeHtml(post.excerpt || '') + '</p>' +
                '<div class="post-tags">' + tagsHtml + '</div>' +
                '</a>';
        }).join('');
    }

    function renderSidebar() {
        var posts = SITE_CONFIG.posts;

        // Categories
        var categories = {};
        posts.forEach(function (p) {
            var cat = p.category || '未分类';
            if (!categories[cat]) categories[cat] = 0;
            categories[cat]++;
        });

        var catList = document.getElementById('category-list');
        if (catList) {
            catList.innerHTML = Object.keys(categories).map(function (cat) {
                return '<div class="category-item">' +
                    '<span>' + escapeHtml(cat) + '</span>' +
                    '<span class="category-count">' + categories[cat] + '</span>' +
                    '</div>';
            }).join('');
        }

        // Tags
        var tagCounts = {};
        posts.forEach(function (p) {
            (p.tags || []).forEach(function (t) {
                if (!tagCounts[t]) tagCounts[t] = 0;
                tagCounts[t]++;
            });
        });

        var tagCloud = document.getElementById('tag-cloud');
        if (tagCloud) {
            tagCloud.innerHTML = Object.keys(tagCounts).map(function (t) {
                return '<span class="tag-cloud-item">' + escapeHtml(t) + '</span>';
            }).join('');
        }

        // Archive
        var archives = {};
        posts.forEach(function (p) {
            var month = p.date.substring(0, 7);
            if (!archives[month]) archives[month] = 0;
            archives[month]++;
        });

        var archiveList = document.getElementById('archive-list');
        if (archiveList) {
            var sortedMonths = Object.keys(archives).sort().reverse();
            archiveList.innerHTML = sortedMonths.map(function (m) {
                return '<div class="archive-item">' +
                    '<span>' + escapeHtml(m) + '</span>' +
                    '<span class="archive-count">' + archives[m] + ' 篇</span>' +
                    '</div>';
            }).join('');
        }
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

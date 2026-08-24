/**
 * About page logic
 * Fetches and renders the about.md file
 */

(function () {
    'use strict';

    // ===== Theme Toggle =====
    initThemeToggle();

    // ===== Mobile Menu =====
    initMobileMenu();

    // ===== Load About Content =====
    loadAbout();

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

    function loadAbout() {
        var contentEl = document.getElementById('about-content');
        if (!contentEl) return;

        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
        }

        var basePath = getBasePath();
        var fetchUrl = basePath + 'about.md';

        fetch(fetchUrl)
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function (mdText) {
                var html = '';
                if (typeof marked !== 'undefined') {
                    html = marked.parse(mdText);
                } else {
                    html = '<pre>' + escapeHtml(mdText) + '</pre>';
                }
                contentEl.innerHTML = html;

                if (typeof hljs !== 'undefined') {
                    contentEl.querySelectorAll('pre code').forEach(function (block) {
                        hljs.highlightElement(block);
                    });
                }
            })
            .catch(function (err) {
                contentEl.innerHTML = '<div class="error-message"><p>加载失败: ' + escapeHtml(err.message) + '</p></div>';
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

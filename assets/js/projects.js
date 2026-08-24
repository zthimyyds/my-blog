/**
 * Projects page logic
 * Renders project cards from SITE_CONFIG.projects
 */

(function () {
    'use strict';

    // ===== Theme Toggle =====
    initThemeToggle();

    // ===== Mobile Menu =====
    initMobileMenu();

    // ===== Render Projects =====
    renderProjects();

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
        });
    }

    function initMobileMenu() {
        var btn = document.getElementById('mobile-menu-btn');
        var links = document.querySelector('.nav-links');
        if (!btn || !links) return;

        btn.addEventListener('click', function () {
            links.classList.toggle('open');
        });
    }

    function renderProjects() {
        var grid = document.getElementById('projects-grid');
        if (!grid) return;

        var projects = SITE_CONFIG.projects;

        if (projects.length === 0) {
            grid.innerHTML = '<div class="error-message"><p>暂无项目</p></div>';
            return;
        }

        grid.innerHTML = projects.map(function (project) {
            var techHtml = (project.tech || []).map(function (t) {
                return '<span class="project-tech-item">' + escapeHtml(t) + '</span>';
            }).join('');

            var linksHtml = '';
            if (project.demo) {
                linksHtml += '<a href="' + escapeHtml(project.demo) + '" target="_blank" rel="noopener" class="project-link primary">在线演示</a>';
            }
            if (project.repo) {
                linksHtml += '<a href="' + escapeHtml(project.repo) + '" target="_blank" rel="noopener" class="project-link secondary">源代码</a>';
            }

            return '<div class="project-card">' +
                '<div class="project-card-header">' +
                '<div class="project-icon">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M2 22a8 8 0 0 1 8-8"/><path d="M14 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93"/><path d="M14 14a4 4 0 0 1 4 4"/><circle cx="14" cy="6" r="2"/><circle cx="6" cy="18" r="2"/>' +
                '</svg>' +
                '</div>' +
                '<span class="project-name">' + escapeHtml(project.name) + '</span>' +
                '</div>' +
                '<p class="project-description">' + escapeHtml(project.description) + '</p>' +
                (techHtml ? '<div class="project-tech">' + techHtml + '</div>' : '') +
                (linksHtml ? '<div class="project-links">' + linksHtml + '</div>' : '') +
                '</div>';
        }).join('');
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

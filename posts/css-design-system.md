# 构建轻量级 CSS 设计系统

基于 CSS 自定义属性构建一套支持暗色模式的设计系统，涵盖颜色、圆角、阴影、间距等核心视觉令牌。

## 什么是设计系统

设计系统不是组件库，而是一套**统一的视觉语言规则**。它定义了颜色、间距、字体、圆角等核心令牌（Design Tokens），让整个站点的视觉风格保持一致性。

## 核心令牌定义

### 颜色系统

使用 HSL 格式定义颜色，方便调节透明度和派生色阶：

```css
:root {
    /* 主色 — 鲜亮蓝色 */
    --color-primary: hsl(212, 100%, 47%);
    --color-primary-hover: hsl(212, 100%, 38%);
    --color-primary-light: hsl(212, 92%, 95%);

    /* 次色 — 深紫色 */
    --color-secondary: hsl(270, 67%, 47%);

    /* 表面颜色 */
    --color-background: hsl(0, 0%, 100%);
    --color-content1: hsl(0, 0%, 100%);
    --color-content2: hsl(240, 5%, 96%);
    --color-content3: hsl(240, 6%, 90%);

    /* 文本颜色 */
    --color-text-primary: hsl(202, 24%, 9%);
    --color-text-secondary: hsl(202, 10%, 40%);
    --color-text-tertiary: hsl(202, 8%, 55%);
}
```

### 暗色模式

暗色模式的关键是**反转亮度**，但保持色相不变：

```css
[data-theme="dark"] {
    --color-background: hsl(0, 0%, 0%);
    --color-content1: hsl(240, 6%, 10%);
    --color-content2: hsl(240, 4%, 16%);

    --color-text-primary: hsl(210, 6%, 93%);
    --color-text-secondary: hsl(210, 5%, 65%);
}
```

### 圆角

三级圆角系统覆盖从按钮到卡片的不同场景：

```css
--radius-small: 8px;    /* 按钮、标签 */
--radius-medium: 12px;  /* 卡片、输入框 */
--radius-large: 14px;   /* 大容器、弹窗 */
```

### 阴影

多层投影营造立体感，暗色模式额外添加 `inset` 高光：

```css
/* 亮色模式 */
--shadow-small: 0px 0px 5px rgba(0,0,0,0.02),
                0px 2px 10px rgba(0,0,0,0.06),
                0px 0px 1px rgba(0,0,0,0.3);

/* 暗色模式 — 多一层 inset 高光 */
--shadow-small: 0px 0px 5px rgba(0,0,0,0.05),
                0px 2px 10px rgba(0,0,0,0.2),
                inset 0px 0px 1px rgba(255,255,255,0.15);
```

## 使用 `color-mix` 实现毛玻璃效果

导航栏使用了 `color-mix` 函数实现半透明背景 + 模糊：

```css
.navbar {
    background-color: color-mix(in srgb, var(--color-background) 80%, transparent);
    backdrop-filter: blur(12px);
}
```

## 主题切换实现

```javascript
toggle.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});
```

关键点：
- 主题状态存储在 `localStorage`
- 首次访问通过 `prefers-color-scheme` 媒体查询检测系统偏好
- 切换时所有 CSS 变量自动更新，`transition` 让过渡平滑

## 总结

一套好的设计系统应该：
1. **令牌化** — 所有视觉值通过 CSS 变量定义
2. **语义化** — 变量名表达用途而非颜色值
3. **可扩展** — 新增暗色模式只需覆写变量
4. **无依赖** — 纯 CSS 实现，不依赖任何框架

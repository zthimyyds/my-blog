# Git 分支管理实践

总结日常开发中的 Git 分支管理策略，包括 feature 分支、hotfix 流程、rebase 与 merge 的取舍。

## 分支模型

采用简化的 Git Flow 模型，保持轻量：

```
main          ──────●──────────●──────────●────────
                        \       /    \      /
develop       ──●──●──●─●──────●──●──●────●──────
                  \      /         \    /
feature/xxx    ────●──●─●     ─────●──●─●
                                  \
hotfix/xxx                       ───●──●──→ (merge to main & develop)
```

## 分支命名规范

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| 主分支 | `main` | — |
| 开发分支 | `develop` | — |
| 功能分支 | `feature/描述` | `feature/user-auth` |
| 修复分支 | `fix/描述` | `fix/login-redirect` |
| 热修复 | `hotfix/描述` | `hotfix/crash-on-startup` |
| 发布分支 | `release/版本` | `release/v2.1.0` |

## 日常操作

### 创建功能分支

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-api
```

### 提交规范

使用约定式提交（Conventional Commits）：

```bash
git commit -m "feat: 添加用户认证接口"
git commit -m "fix: 修复登录重定向问题"
git commit -m "docs: 更新 API 文档"
git commit -m "refactor: 重构数据访问层"
git commit -m "chore: 升级依赖版本"
```

类型前缀：
- `feat` — 新功能
- `fix` — Bug 修复
- `docs` — 文档
- `style` — 格式调整（不影响代码逻辑）
- `refactor` — 重构
- `test` — 测试
- `chore` — 构建/工具

### 合并功能分支

```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/new-api
git branch -d feature/new-api
git push origin develop
```

`--no-ff` 保留合并记录，便于追踪分支历史。

## Rebase vs Merge

### Merge

```bash
git merge feature/xxx
```

- 保留完整的分支历史
- 产生合并提交（merge commit）
- 适合公共分支间的合并

### Rebase

```bash
git checkout feature/xxx
git rebase develop
```

- 线性历史，更整洁
- 重写提交历史，改变 commit hash
- 仅在本地分支使用，**不要对已推送的分支执行 rebase**

### 实践建议

- 本地开发时用 `rebase` 保持分支最新
- 合并到 `develop`/`main` 时用 `merge --no-ff`
- 永远不要 rebase 已经推送到远程的公共分支

## Hotfix 流程

生产环境出现紧急 Bug 时：

```bash
# 1. 从 main 创建热修复分支
git checkout main
git checkout -b hotfix/critical-bug

# 2. 修复并测试
# ... 修改代码 ...
git commit -m "fix: 修复生产环境崩溃问题"

# 3. 合并回 main
git checkout main
git merge --no-ff hotfix/critical-bug
git tag v1.2.1

# 4. 合并回 develop
git checkout develop
git merge --no-ff hotfix/critical-bug

# 5. 删除热修复分支
git branch -d hotfix/critical-bug
```

## 常用技巧

### 暂存当前工作

```bash
git stash                    # 暂存
git checkout main            # 切换处理其他事
git checkout feature/xxx     # 回来
git stash pop                # 恢复
```

### 查看分支图

```bash
git log --oneline --graph --all --decorate
```

### 清理已合并的本地分支

```bash
git branch --merged | grep -v 'main\|develop' | xargs git branch -d
```

## 总结

好的分支管理策略应该：
1. **简单** — 团队成员能快速理解
2. **一致** — 所有人遵守同样的规范
3. **安全** — 保护主分支，PR 审查
4. **可追溯** — 清晰的提交历史和合并记录

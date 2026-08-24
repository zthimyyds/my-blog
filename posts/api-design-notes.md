# RESTful API 设计要点

梳理 RESTful API 设计中的关键原则：资源命名、HTTP 方法语义、状态码使用、分页与错误处理。

## 核心原则

REST（Representational State Transfer）的核心思想是**资源导向**：

- 每个 URL 代表一个资源
- 用 HTTP 方法表示对资源的操作
- 用状态码表示操作结果
- 无状态通信

## 资源命名

### 好的命名

```
GET    /api/users           # 获取用户列表
GET    /api/users/123       # 获取单个用户
POST   /api/users           # 创建用户
PUT    /api/users/123       # 更新用户（整体）
PATCH  /api/users/123       # 更新用户（部分）
DELETE /api/users/123       # 删除用户
```

### 命名规范

- 使用**名词复数**：`/users` 而非 `/user` 或 `/getUsers`
- 使用**小写连字符**：`/user-profiles` 而非 `/userProfiles`
- **嵌套表达从属关系**：`/users/123/orders`
- 避免超过两层嵌套：`/users/123/orders/456/items` 太深，考虑独立端点

### 避免

```
# 错误示例
GET    /api/getUser?id=123      # 不要在 URL 中使用动词
POST   /api/createUser          # 同上
GET    /api/user_list           # 不要用下划线
```

## HTTP 方法语义

| 方法 | 语义 | 幂等 | 安全 |
|------|------|------|------|
| GET | 获取资源 | 是 | 是 |
| POST | 创建资源 | 否 | 否 |
| PUT | 整体更新 | 是 | 否 |
| PATCH | 部分更新 | 否 | 否 |
| DELETE | 删除 | 是 | 否 |

**幂等**：多次执行效果相同。**安全**：不修改资源。

## 状态码

### 常用状态码

```
2xx — 成功
  200 OK              # 请求成功（通用）
  201 Created         # 资源创建成功
  204 No Content      # 成功但无返回内容（如 DELETE）

4xx — 客户端错误
  400 Bad Request     # 请求参数错误
  401 Unauthorized    # 未认证
  403 Forbidden       # 已认证但无权限
  404 Not Found       # 资源不存在
  409 Conflict        # 资源冲突
  422 Unprocessable   # 参数格式正确但语义错误
  429 Too Many        # 请求频率超限

5xx — 服务端错误
  500 Internal Error  # 服务器内部错误
  502 Bad Gateway     # 网关错误
  503 Unavailable     # 服务不可用
```

### 401 vs 403

- **401**：不知道你是谁（未登录、token 无效）
- **403**：知道你是谁，但你没权限（普通用户访问管理员接口）

## 分页

### 偏移分页（适合中小数据集）

```
GET /api/users?page=1&page_size=20
```

响应：

```json
{
    "data": [...],
    "pagination": {
        "page": 1,
        "page_size": 20,
        "total": 150,
        "total_pages": 8
    }
}
```

### 游标分页（适合大数据集/实时数据）

```
GET /api/users?cursor=eyJpZCI6MTIzfQ==&limit=20
```

响应：

```json
{
    "data": [...],
    "next_cursor": "eyJpZCI6MTQzfQ==",
    "has_more": true
}
```

游标分页的优势：
- 不受数据变动影响（新增数据不会导致偏移）
- 性能更好（不需要 `COUNT`）
- 适合无限滚动场景

## 错误处理

统一的错误响应格式：

```json
{
    "error": {
        "code": "INVALID_EMAIL",
        "message": "邮箱格式不正确",
        "details": [
            {
                "field": "email",
                "message": "请输入有效的邮箱地址"
            }
        ]
    }
}
```

原则：
- 使用 HTTP 状态码表达错误类别
- `code` 字段供程序判断
- `message` 字段供人类阅读
- `details` 提供字段级错误信息

## 版本控制

在 URL 中包含版本号：

```
/api/v1/users
/api/v2/users
```

或者使用 Header：

```
Accept: application/vnd.myapi.v1+json
```

URL 版本更直观，推荐使用。

## 总结

好的 API 设计应该：
1. **一致性** — 命名、响应格式、错误处理保持统一
2. **可预测** — 开发者能猜到 API 的用法
3. **明确** — 状态码和错误信息清晰
4. **文档化** — 每个 API 都有文档和示例

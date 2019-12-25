# 标签接口文档

## 接口请求返回格式说明

|   参数    |               说明               | 是否必须返回 |
| :-------: | :------------------------------: | :----------: |
|   code    |      响应状态(httpCode 码)       |      是      |
| errorCode | 响应状态(0 :响应成功,1:响应失败) |      是      |
|  message  |       提示信息(成功或失败)       |      是      |
|   data    |   返回的数据(根据情况返回数据)   |      否      |

## errorCode 错误码

| 参数 | 说明 |
| :--: | :--: |
|      |      |
|      |      |
|      |      |
|      |      |
|      |      |

## 获取所有标签

```bash
  POST    http://localhost:3000/api/admin/tags
```

### 参数说明

|   参数   |     说明     |      是否必填      |
| :------: | :----------: | :----------------: |
|   page   |   当前页码   |   否 默认 第一页   |
| per_page | 每页显示数据 | 否 默认 显示 15 条 |
|  query   |   查询条件   |         否         |

> 获取成功返回

```json
{
  "code": 200,
  "errorCode": 0,
  "message": "响应成功~",
  "data": {
    "tags": [],
    "total": 0
  }
}
```

> 获取失败返回

```json
{
  "code": 200,
  "errorCode": 0,
  "message": "响应成功~",
  "data": {
    "tags": [],
    "total": 0
  }
}
```

## 通过 id 获取指定标签

```javascript
POST http://localhost:3000/api/admin/tags/:id

```

### 参数说明

| 参数 |  说明   | 是否必填 |
| :--: | :-----: | :------: |
|  id  | 标签 id |    是    |

> 成功操作返回

```json
{
  "code": 200,
  "errorCode": 0,
  "message": "响应成功~",
  "data": {}
}
```

> 失败操作返回

```json
{
  "code": 200,
  "errorCode": 0,
  "message": "标签不存在~"
}
```

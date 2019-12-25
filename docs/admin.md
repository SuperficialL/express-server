# 管理员接口文档

## 接口请求返回格式说明

|   参数    |               说明               | 是否必须返回 |
| :-------: | :------------------------------: | :----------: |
|   code    |      响应状态(httpCode 码)       |      是      |
| errorCode | 响应状态(0 :响应成功,1:响应失败) |      是      |
|  message  |       提示信息(成功或失败)       |      是      |
|   data    |   返回的数据(根据情况返回数据)   |      否      |

## errorCode 错误码

|  参数   |     说明     |
| :-----: | :----------: |
| 1000101 | 账号不可为空 |
| 1000102 | 密码不可为空 |
| 1000103 |   密码错误   |
| 1000104 |  用户已存在  |
| 1000404 |  用户不存在  |

## 注册

> 项目上线后建议屏蔽掉此注册接口

```bash
  POST    http://localhost:3000/api/admin/register
```

### 参数说明

|   参数    |   说明   | 是否必填 |
| :-------: | :------: | :------: |
| username  |   昵称   |    是    |
|   email   |   邮箱   |    是    |
| password  |   密码   |    是    |
| password2 | 确认密码 |    是    |

> 注册成功返回

```json
{
  "code": 200,
  "errorCode": 0,
  "message": "账号注册成功～"
}
```

> 注册失败返回

```json
{
  "code": 200,
  "message": "用户已存在~",
  "errorCode": 40004
}
```

## 登录

`javascript
POST http://localhost:3000/api/admin/login

````

## ## 参数说明

参数 | 说明 | 是否必填
| :---: | :---: | :---: |
email | 邮箱 | 是
password | 密码 | 是

> 成功操作返回

```json
{
  "code": 200,
  "message": "登录成功~",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJ1aWQiOjMsInNjb3BlIjoxNiwiaWF0IjoxNTYwNTE0NzQwLCJleHAiOjE1NjA1MTgzNDB9.E7k-3bFWizGq2ykrmBgIF0Ng-2oPI70RdhvRTJ3GA4Y"
}
````

> 失败操作返回

```json
{
  "code": 200,
  "message": "账号或密码验证不正确~",
  "errorCode": 20003
}
```

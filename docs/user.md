# 后台管理用户

```bash
  接口地址 http://localhost:3000/
```

## 接口请求返回格式说明

|   参数    |               说明               | 是否必须返回 |
| :-------: | :------------------------------: | :----------: |
|   code    | 响应状态(0 :响应成功,1:响应失败) |      是      |
| errorCode |             响应状态             |      是      |
|  message  |       提示信息(成功或失败)       |      是      |
|   data    |   返回的数据(根据情况返回数据)   |      否      |

## errorCode 种类

|  参数   |     说明     |
| :-----: | :----------: |
| 1000101 | 账号不可为空 |
| 1000102 | 密码不可为空 |
| 1000103 |   密码错误   |
| 1000104 |  用户已存在  |
| 1000404 |  用户不存在  |
| 1000101 | 账号不可为空 |
| 1000101 | 账号不可为空 |

## 注册

> 项目上线后建议屏蔽掉此注册接口

```bash
  POST    /admin/register
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
  "code": 0,
  "message": "账号注册成功～"
}
```

> 注册失败返回

```json
{
  "code": 1,
  "message": "账号注册失败～"
}
```

## 登录

`javascript
POST /admin/login

````

## ## 参数说明

参数 | 说明 | 是否必填
| :---: | :---: | :---: |
email | 邮箱 | 是
password | 密码 | 是

> 成功操作返回

```json
{
  "code": 0,
  "message": "登录成功~",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsInNjb3BlIjoxNiwiaWF0IjoxNTYwNTE0NzQwLCJleHAiOjE1NjA1MTgzNDB9.E7k-3bFWizGq2ykrmBgIF0Ng-2oPI70RdhvRTJ3GC4Y"
}
````

> 失败操作返回

```json
{
  "code": 1,
  "message": "账号或密码错误~"
}
```

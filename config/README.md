# 环境配置说明

本项目已配置了开发和生产环境的环境变量，所有环境配置文件都放在 `config` 目录下。

## 环境文件说明

- `.env` - 基础环境配置，所有环境共享的变量
- `.env.development` - 开发环境特定配置
- `.env.production` - 生产环境特定配置

## 使用方法

### 开发环境

运行以下命令启动开发服务器：

```bash
npm run dev
```

这将自动加载 `.env` 和 `.env.development` 文件中的配置。

### 生产环境

运行以下命令构建生产版本：

```bash
npm run build
```

这将自动加载 `.env` 和 `.env.production` 文件中的配置。

## 在代码中使用环境变量

在 Vue 组件中，可以通过 `import.meta.env` 访问环境变量：

```typescript
// 获取环境变量
const appTitle = import.meta.env.VITE_APP_TITLE
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const isDev = import.meta.env.DEV
```

## 环境变量说明

### 基础环境变量 (.env)

- `VITE_APP_TITLE` - 应用标题
- `VITE_APP_VERSION` - 应用版本
- `VITE_API_BASE_URL` - API基础路径
- `VITE_APP_DESCRIPTION` - 应用描述

### 开发环境变量 (.env.development)

- `NODE_ENV` - 环境标识 (development)
- `VITE_API_BASE_URL` - 开发环境API地址
- `VITE_APP_DEBUG` - 是否开启调试模式
- `VITE_APP_MOCK_API` - 是否使用模拟API
- `VITE_DEV_SERVER_PORT` - 开发服务器端口
- `VITE_DEV_SERVER_HOST` - 开发服务器主机

### 生产环境变量 (.env.production)

- `NODE_ENV` - 环境标识 (production)
- `VITE_API_BASE_URL` - 生产环境API地址
- `VITE_APP_DEBUG` - 是否开启调试模式
- `VITE_APP_MOCK_API` - 是否使用模拟API
- `VITE_BUILD_COMPRESS` - 是否压缩构建结果
- `VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE` - 是否删除原始文件

## 注意事项

1. 只有以 `VITE_` 开头的变量才会暴露给客户端代码
2. 更改环境变量后需要重启开发服务器
3. 敏感信息不应该放在环境变量中，应该使用服务器端环境变量
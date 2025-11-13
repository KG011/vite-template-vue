# 项目启动工具使用指南

本项目提供了一个交互式启动工具，可以通过简单的选择来配置环境并执行相应的操作。

## 使用方法

在项目根目录下运行以下命令启动交互式工具：

```bash
pnpm start
```

或者：

```bash
pnpm run start
```

## 功能特性

### 1. 环境选择
工具提供三种环境选项：
- **开发环境**: 用于本地开发，支持热重载
- **生产环境**: 用于生产部署，优化构建
- **测试环境**: 用于测试环境部署

### 2. 操作选择
根据所选环境，可以选择以下操作：
- **运行**: 启动开发服务器
- **打包**: 构建生产版本
- **预览**: 预览生产构建

## 环境配置

每个环境都有对应的配置文件：
- 开发环境: `config/.env.development`
- 生产环境: `config/.env.production`
- 测试环境: `config/.env.test`

配置文件中可以设置环境变量，例如：
```
VITE_APP_TITLE=Vue项目 - 开发环境
VITE_APP_ENV=development
VITE_API_BASE_URL=https://api-dev.example.com
```

## 使用示例

1. 启动开发服务器：
   ```
   pnpm start
   → 选择: 开发环境
   → 选择: 运行
   ```

2. 构建生产版本：
   ```
   pnpm start
   → 选择: 生产环境
   → 选择: 打包
   ```

3. 预览构建结果：
   ```
   pnpm start
   → 选择: 生产环境
   → 选择: 预览
   ```

## 技术实现

本工具使用以下技术实现：
- [inquirer](https://github.com/SBoudrias/Inquirer.js/) - 交互式命令行界面
- Node.js `child_process` 模块 - 执行系统命令
- Node.js `fs` 模块 - 读取项目信息

## 自定义配置

要添加新环境或修改现有环境，请编辑 `scripts/start.js` 文件中的 `environments` 对象：

```javascript
const environments = {
  // 现有环境...
  'custom': {
    name: '自定义环境',
    description: '自定义环境描述',
    config: '.env.custom'
  }
};
```

要添加新操作，请编辑 `actions` 对象：

```javascript
const actions = {
  // 现有操作...
  'custom': {
    name: '自定义操作',
    description: '自定义操作描述',
    command: 'your-command',
    args: ['--your-args']
  }
};
```
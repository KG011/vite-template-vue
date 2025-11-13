# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 快速开始

### 使用交互式启动工具

本项目提供了一个交互式启动工具，可以通过简单的选择来配置环境并执行相应的操作：

```bash
pnpm start
```

这个工具会引导您选择环境（开发/生产/测试）和操作（运行/打包/预览），然后自动执行相应的命令。

详细使用说明请参考 [scripts/START_README.md](./scripts/START_README.md)

### 传统方式

如果您更喜欢传统方式，仍然可以使用以下命令：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 包管理器

**本项目强制使用 pnpm 作为包管理器。**

### 安装 pnpm

如果您尚未安装 pnpm，可以使用以下命令安装：

```bash
npm install -g pnpm
```

或者使用其他方式安装，请参考 [pnpm 官方文档](https://pnpm.io/installation)。

### 使用 pnpm

安装依赖：

```bash
pnpm install
```

添加新依赖：

```bash
pnpm add [package-name]
```

添加开发依赖：

```bash
pnpm add [package-name] -D
```

运行脚本：

```bash
pnpm [script-name]
```

### 为什么选择 pnpm？

1. **更高效的依赖管理**：通过硬链接和符号链接共享依赖
2. **节省磁盘空间**：相同的包只存储一次
3. **更快的安装速度**：并行安装和高效的缓存机制
4. **更严格的依赖解析**：避免幽灵依赖问题

详细规则请参考 [PROJECT_RULES.md](./PROJECT_RULES.md)

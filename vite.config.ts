import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 获取配置目录路径
  const configDir = resolve(process.cwd(), 'config')

  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, configDir, '')

  // 加载基础环境配置，确保优先使用基础配置中的 VITE_APP_TITLE
  const baseEnv = loadEnv('', configDir, '')
  const appTitle = env.VITE_APP_TITLE || baseEnv.VITE_APP_TITLE || 'app'

  return {
    plugins: [vue()],
    // 环境配置
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },
    // 路径解析
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@config': fileURLToPath(new URL('./config', import.meta.url))
      }
    },
    // 开发服务器配置
    server: {
      host: env.VITE_DEV_SERVER_HOST || 'localhost',
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 5173,
      open: true
    },
    // 构建配置
    build: {
      // 根据环境变量和APP标题设置输出目录
      outDir: `dist/${appTitle}-${mode}`,
      // 静态资源存放路径
      assetsDir: 'static',
      // rollup底层打包配置
      rollupOptions: {
        // 按类型存放资源
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          experimentalMinChunkSize: 30 * 1024 // 合并小模块
        }
      },
      // 是否生成 source map 文件
      sourcemap: mode === 'development',
      // 小于10kb资源内联为base64编码
      assetsInlineLimit: 10240
    }
  }
})

/*
 * @Author: lichenghao 1660831196@qq.com
 * @Date: 2025-11-13 16:42:50
 * @LastEditors: lichenghao 1660831196@qq.com
 * @LastEditTime: 2025-11-13 17:37:27
 * @FilePath: \vite-template-vue\scripts\start.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import inquirer from 'inquirer'
import { readFileSync, createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import spawn from 'cross-spawn'
import { loadEnv } from 'vite'
import archiver from 'archiver'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取项目根目录
const projectRoot = join(__dirname, '..')

// 读取package.json获取项目信息
const packageJson = JSON.parse(
  readFileSync(join(projectRoot, 'package.json'), 'utf8')
)

// 定义环境配置
const environments = {
  development: {
    name: '开发环境',
    description: '用于本地开发，支持热重载',
    config: '.env.development'
  },
  production: {
    name: '生产环境',
    description: '用于生产部署，优化构建',
    config: '.env.production'
  },
  test: {
    name: '测试环境',
    description: '用于测试环境部署',
    config: '.env.test'
  }
}

// 定义操作类型
const actions = {
  run: {
    name: '运行',
    description: '启动开发服务器',
    script: 'dev'
  },
  build: {
    name: '打包',
    description: '构建生产版本',
    script: 'build'
  },
  preview: {
    name: '预览',
    description: '预览生产构建',
    script: 'preview'
  }
}

// 压缩目录为ZIP文件
async function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const output = createWriteStream(outPath)

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(
        `\n📦 压缩完成！ZIP文件大小: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`
      )
      resolve()
    })

    archive.on('error', err => reject(err))
    archive.pipe(output)
    archive.directory(sourceDir, false)
    archive.finalize()
  })
}

async function selectEnvironment() {
  const { environment } = await inquirer.prompt([
    {
      type: 'list',
      name: 'environment',
      message: '请选择运行环境:',
      choices: Object.entries(environments).map(([key, env]) => ({
        name: `${env.name} - ${env.description}`,
        value: key
      })),
      default: 'development'
    }
  ])

  return environment
}

async function selectAction(environment) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `请选择操作 (${environments[environment].name}):`,
      choices: Object.entries(actions).map(([key, act]) => ({
        name: `${act.name} - ${act.description}`,
        value: key
      })),
      default: 'run'
    }
  ])

  return action
}

function executeCommand(action, environment) {
  const selectedAction = actions[action]
  const selectedEnv = environments[environment]

  console.log(`\n🚀 正在${selectedAction.name} (${selectedEnv.name})...`)

  // 设置环境变量
  process.env.NODE_ENV = environment

  // 构建命令
  let command
  if (action === 'run') {
    command = 'pnpm run dev'
  } else if (action === 'build') {
    command = `pnpm run build --mode ${environment}`
  } else if (action === 'preview') {
    command = 'pnpm run preview'
  }

  // 执行命令 - 使用 shell: true 确保在 Windows 上正确执行
  const child = spawn(command, [], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: true
  })

  child.on('close', async code => {
    if (action === 'build') {
      if (code === 0) {
        // 读取环境变量获取应用标题，优先使用基础配置中的 VITE_APP_TITLE
        const configDir = join(projectRoot, 'config')
        const env = loadEnv(environment, configDir, '')
        const baseEnv = loadEnv('', configDir, '')
        const appTitle = env.VITE_APP_TITLE || baseEnv.VITE_APP_TITLE || 'app'
        const buildDir = join(projectRoot, `dist/${appTitle}-${environment}`)
        const zipPath = join(projectRoot, `dist/${appTitle}-${environment}.zip`)

        console.log('\n✅ 构建完成！')
        console.log(`构建文件位于: ${buildDir}`)

        // 压缩构建结果
        console.log('\n📦 正在压缩构建结果...')
        try {
          await zipDirectory(buildDir, zipPath)
          console.log(`压缩文件已保存至: ${zipPath}`)
        } catch (error) {
          console.error('\n❌ 压缩失败:', error.message)
        }
      } else {
        console.log(`\n❌ 构建失败，退出代码: ${code}`)
      }
    } else {
      console.log(`\n⏹️ 服务器已停止，退出代码: ${code}`)
    }
  })

  child.on('error', error => {
    console.error(`\n❌ 执行命令时出错: ${error.message}`)
  })
}

async function main() {
  console.log(`\n🎯 ${packageJson.name || 'Vue项目'} 启动工具\n`)

  try {
    // 选择环境
    const environment = await selectEnvironment()

    // 选择操作
    const action = await selectAction(environment)

    // 执行命令
    executeCommand(action, environment)
  } catch (error) {
    console.error('发生错误:', error.message)
    process.exit(1)
  }
}

// 运行主函数
main()

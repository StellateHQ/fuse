import type { PackageManager } from './get-package-manager'
import { execa } from 'execa'

export async function install(
  packageManager: PackageManager,
  env: 'prod' | 'dev',
  packages: string[],
): Promise<void> {
  let args: string[] = []
  switch (packageManager) {
    case 'npm': {
      args.push('install')
      if (env === 'dev') {
        args.push('--save-dev')
      } else {
        args.push('--save')
      }
    }
    case 'yarn': {
      args.push('add')
      if (env === 'dev') {
        args.push('-D')
      }
    }
    case 'pnpm': {
      args.push('add')
      if (env === 'dev') {
        args.push('-D')
      }
    }
    case 'bun': {
      args.push('add')
      if (env === 'dev') {
        args.push('-D')
      }
    }
  }

  args.push(...packages)
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  await execa(packageManager, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
    },
  })
}

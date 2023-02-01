import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getHookTemplate } from '../../templates/hook'

export async function buildHookFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/index.tsx`

  if (existsSync(targetPath)) {
    throw Error(`[Hook] ${componentName} already exists in this path.`)
  }

  try {
    const template = getHookTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

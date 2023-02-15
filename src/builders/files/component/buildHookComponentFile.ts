import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getHookComponentTemplate } from '../../../templates/component'

export async function buildHookComponentFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/index.tsx`

  if (existsSync(targetPath)) {
    throw Error(`[HookComponent] ${componentName} already exists in this path.`)
  }

  try {
    const template = getHookComponentTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getHookTypesTemplate } from '../../../templates/hook'

export async function buildHookTypesFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/index.tsx`

  if (existsSync(targetPath)) {
    throw Error(`[Hook-Types] ${componentName} already exists in this path.`)
  }

  try {
    const template = getHookTypesTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

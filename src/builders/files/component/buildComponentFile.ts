import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getComponentTemplate } from '../../../templates/component'

export async function buildComponentFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/index.tsx`

  if (existsSync(targetPath)) {
    throw Error(`[Component] ${componentName} already exists in this path.`)
  }

  try {
    const template = getComponentTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

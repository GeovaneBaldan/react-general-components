import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getModalTemplate } from '../../templates/modal'

export async function buildModalFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/index.tsx`

  if (existsSync(targetPath)) {
    throw Error(`[Modal] ${componentName} already exists in this path.`)
  }

  try {
    const template = getModalTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

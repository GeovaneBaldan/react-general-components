import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getModalTypesTemplate } from '../../../templates/modal'

export async function buildModalTypesFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/types.ts`

  if (existsSync(targetPath)) {
    throw Error(`[Modal-Types] ${componentName} already exists in this path.`)
  }

  try {
    const template = getModalTypesTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

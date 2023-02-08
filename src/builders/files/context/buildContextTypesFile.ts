import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getContextTypesTemplate } from '../../../templates/context'

export async function buildContextTypesFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/types.ts`

  if (existsSync(targetPath)) {
    throw Error(`[Context-Types] ${componentName} already exists in this path.`)
  }

  try {
    const template = getContextTypesTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

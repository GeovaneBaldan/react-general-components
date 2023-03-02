import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'
import { createDirectory } from '../../../fs-utilities'

import { buildExportTemplate } from '../../../templates/export'
import { getContextTypesTemplate } from '../../../templates/context'

export async function buildContextTypesFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/types`
  const indexTypesPath = `${targetPath}/index.ts`
  const contextTypesPath = `${targetPath}/${componentName}.ts`

  if (!existsSync(targetPath)) await createDirectory(targetPath)

  if (existsSync(indexTypesPath)) {
    throw Error(`[Context-Types] ${componentName} already exists in this path.`)
  }

  try {
    const template = getContextTypesTemplate(componentName)
    const indexTemplate = buildExportTemplate([componentName])
    await writeFile(contextTypesPath, template, { encoding: 'utf-8' })
    await writeFile(indexTypesPath, indexTemplate, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

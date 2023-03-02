import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { createDirectory } from '../../../fs-utilities'
import { getHookTypesTemplate } from '../../../templates/hook'
import { buildExportTemplate } from '../../../templates/export'

export async function buildHookTypesFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/types`
  const hookTypesPath = `${targetPath}/${componentName}.ts`
  const indexTypesPath = `${targetPath}/index.ts`

  if (!existsSync(targetPath)) await createDirectory(targetPath)

  if (existsSync(hookTypesPath)) {
    throw Error(`[Hook-Types] ${componentName} already exists in this path.`)
  }

  try {
    const template = getHookTypesTemplate(componentName)
    const indexTemplate = buildExportTemplate([componentName])
    await writeFile(hookTypesPath, template, { encoding: 'utf-8' })
    await writeFile(indexTypesPath, indexTemplate, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

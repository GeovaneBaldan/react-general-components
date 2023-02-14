import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getApiTypesTemplate } from '../../../templates/api'

export async function buildApiRouteTypesFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/types.ts`

  if (existsSync(targetPath)) {
    throw Error(`[ApiRoute] ${componentName} already exists in this path.`)
  }

  try {
    const template = getApiTypesTemplate(componentName)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

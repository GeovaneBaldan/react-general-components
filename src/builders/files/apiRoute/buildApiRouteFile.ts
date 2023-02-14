import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { ApiMethods } from '../../../constants/apiMethods'
import { getApiFunctionTemplate } from '../../../templates/api'

export async function buildApiRouteFile(
  componentName: string,
  targetDirectory: string,
  method: ApiMethods
) {
  const targetPath = `${targetDirectory}/${componentName}/index.ts`

  if (existsSync(targetPath)) {
    throw Error(`[ApiRoute] ${componentName} already exists in this path.`)
  }

  try {
    const template = getApiFunctionTemplate(componentName, method)
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error('deu ruim aq')
  }
}

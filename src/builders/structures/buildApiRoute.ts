import { existsSync } from 'fs'

import { createDirectory } from '../../fs-utilities'
import { ApiMethods } from '../../constants/apiMethods'
import { buildApiRouteFile } from '../files/apiRoute/buildApiRouteFile'
import { buildApiRouteTypesFile } from '../files/apiRoute/buildApiRouteTypesFile'

export async function buildApiRoute(
  componentName: string,
  targetDirectory: string,
  method: ApiMethods
) {
  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${componentName}`)
  }

  await buildApiRouteFile(componentName, targetDirectory, method)
  await buildApiRouteTypesFile(componentName, targetDirectory)
}

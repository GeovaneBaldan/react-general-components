import { existsSync } from 'fs'

import { formatHookName } from '../../utils'
import { createDirectory } from '../../fs-utilities'
import { buildHookFile, buildHookTypesFile } from '../files'

export async function buildHook(
  componentName: string,
  targetDirectory: string
) {
  const { hookName } = formatHookName(componentName)
  if (!existsSync(`${targetDirectory}/${hookName}`)) {
    await createDirectory(`${targetDirectory}/${hookName}`)
  }

  await buildHookFile(hookName, targetDirectory)
  await buildHookTypesFile(hookName, targetDirectory)
}

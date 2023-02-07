import { existsSync } from 'fs'
import { createDirectory } from '../../fs-utilities'
import { buildHookFile, buildHookTypesFile } from '../files'

export async function buildHook(
  componentName: string,
  targetDirectory: string
) {
  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${componentName}`)
  }

  await buildHookFile(componentName, targetDirectory)
  await buildHookTypesFile(componentName, targetDirectory)
}

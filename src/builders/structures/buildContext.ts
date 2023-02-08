import { existsSync } from 'fs'

import { formatContextName } from '../../utils'
import { createDirectory } from '../../fs-utilities'
import { buildContextFile, buildContextTypesFile } from '../files'

export async function buildContext(
  componentName: string,
  targetDirectory: string
) {
  const { contextName } = formatContextName(componentName)

  if (!existsSync(`${targetDirectory}/${contextName}`)) {
    await createDirectory(`${targetDirectory}/${contextName}`)
  }

  await buildContextFile(contextName, targetDirectory)
  await buildContextTypesFile(contextName, targetDirectory)
}

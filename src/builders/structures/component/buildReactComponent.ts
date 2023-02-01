import { existsSync } from 'fs'

import {
  buildComponentFile,
  buildWebStyledFile,
  buildMobileStyledFile
} from '../../files'
import { createDirectory } from '../../../fs-utilities'

export async function buildReactComponent(
  componentName: string,
  targetDirectory: string,
  type: 'mobile' | 'web'
) {
  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${componentName}`)
  }

  await buildComponentFile(componentName, targetDirectory)

  if (type === 'mobile')
    await buildMobileStyledFile(componentName, targetDirectory)
  else await buildWebStyledFile(componentName, targetDirectory)
}

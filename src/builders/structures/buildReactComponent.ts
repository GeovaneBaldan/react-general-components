import { existsSync } from 'fs'

import {
  buildComponentFile,
  buildWebStyledFile,
  buildMobileStyledFile
} from '../files'
import { createDirectory } from '../../fs-utilities'
import { ComponentTypes } from '../../constants/componentTypes'

export async function buildReactComponent(
  componentName: string,
  targetDirectory: string,
  type: ComponentTypes
) {
  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${componentName}`)
  }

  await buildComponentFile(componentName, targetDirectory)

  if (type === ComponentTypes.MOBILE)
    await buildMobileStyledFile(componentName, targetDirectory)
  else await buildWebStyledFile(componentName, targetDirectory)
}

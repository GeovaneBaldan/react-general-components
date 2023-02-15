import { existsSync } from 'fs'

import {
  buildWebStyledFile,
  buildMobileStyledFile,
  buildHookComponentFile
} from '../files'
import { createDirectory } from '../../fs-utilities'
import { ComponentTypes } from '../../constants/componentTypes'

export async function buildReactHookComponent(
  componentName: string,
  targetDirectory: string,
  type: ComponentTypes
) {
  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${componentName}`)
  }

  await buildHookComponentFile(componentName, targetDirectory)

  if (type === ComponentTypes.MOBILE)
    await buildMobileStyledFile(componentName, targetDirectory)
  else await buildWebStyledFile(componentName, targetDirectory)
}

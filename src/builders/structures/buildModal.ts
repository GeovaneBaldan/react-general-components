import { existsSync } from 'fs'

import {
  buildModalFile,
  buildWebStyledFile,
  buildModalTypesFile,
  buildMobileStyledFile
} from '../files'
import { createDirectory } from '../../fs-utilities'
import { ComponentTypes } from '../../constants/componentTypes'

export async function buildModal(
  componentName: string,
  targetDirectory: string,
  type: ComponentTypes
) {
  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${componentName}`)
  }

  await buildModalFile(componentName, targetDirectory)
  await buildModalTypesFile(componentName, targetDirectory)

  if (type === ComponentTypes.MOBILE) {
    await buildMobileStyledFile(componentName, targetDirectory)
  } else await buildWebStyledFile(componentName, targetDirectory)
}

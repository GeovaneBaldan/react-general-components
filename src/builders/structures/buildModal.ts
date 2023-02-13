import { existsSync } from 'fs'

import {
  buildModalFile,
  buildWebStyledFile,
  buildModalTypesFile,
  buildMobileStyledFile
} from '../files'
import { createDirectory } from '../../fs-utilities'
import { formatModalName } from '../../utils/formatModalName'
import { ComponentTypes } from '../../constants/componentTypes'

export async function buildModal(
  componentName: string,
  targetDirectory: string,
  type: ComponentTypes
) {
  const modalName = formatModalName(componentName)

  if (!existsSync(`${targetDirectory}/${componentName}`)) {
    await createDirectory(`${targetDirectory}/${modalName}`)
  }

  await buildModalFile(modalName, targetDirectory)
  await buildModalTypesFile(modalName, targetDirectory)

  if (type === ComponentTypes.MOBILE) {
    await buildMobileStyledFile(modalName, targetDirectory)
  } else await buildWebStyledFile(modalName, targetDirectory)
}

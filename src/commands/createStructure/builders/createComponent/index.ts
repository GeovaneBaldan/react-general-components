// External Libraries
import { existsSync } from 'fs'
import { window } from 'vscode'

// Builders
import { createComponentFiles } from './createFiles'

// Utils
import {
  pickPlatform,
  pickStructureName,
  pickStructureVariant
} from '../../../../prompts'
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'

export async function createComponent(path: string) {
  const variant = await pickStructureVariant()

  if (!variant)
    return window.showErrorMessage('Select a valid option to continue')

  const platform = await pickPlatform()

  if (!platform)
    return window.showErrorMessage('Select a valid option to continue')

  const componentName = await pickStructureName()

  if (!componentName)
    return window.showErrorMessage('Insert a valid name to continue')

  try {
    const targetDirectory = `${path}/${componentName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    const params = {
      variant,
      platform,
      name: componentName,
      path: targetDirectory
    }

    await createComponentFiles(params)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

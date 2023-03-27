// External Libraries
import { existsSync } from 'fs'
import { window } from 'vscode'

// Builders
import { createComponentFiles } from './createFiles'

// Utils
import {
  promptForPlatform,
  promptForStructureName,
  promptForStructureVariant
} from '../../../../prompts'
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'

export async function createComponent(path: string) {
  const variant = await promptForStructureVariant()

  if (!variant)
    return window.showErrorMessage('Select a valid option to continue')

  const platform = await promptForPlatform()

  if (!platform)
    return window.showErrorMessage('Select a valid option to continue')

  const componentName = await promptForStructureName()

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

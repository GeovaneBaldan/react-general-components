// External Libraries
import { existsSync } from 'fs'
import { window } from 'vscode'

// Builders
import { createModalFiles } from './createFiles'

// Utils
import {
  promptForPlatform,
  promptForStructureName,
  promptForStructureVariant
} from '../../../../prompts'
import { createDirectory } from '../../../../utils/fs'
import { formatModalName, parseError } from '../../../../utils/functions'

export async function createModal(path: string) {
  const variant = await promptForStructureVariant()

  if (!variant)
    return window.showErrorMessage('Select a valid option to continue')

  const platform = await promptForPlatform()

  if (!platform)
    return window.showErrorMessage('Select a valid option to continue')

  const modalName = await promptForStructureName()

  if (!modalName)
    return window.showErrorMessage('Insert a valid name to continue')

  const cleanName = formatModalName(modalName)

  try {
    const targetDirectory = `${path}/${cleanName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    const params = {
      variant,
      platform,
      name: cleanName,
      path: targetDirectory
    }

    await createModalFiles(params)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

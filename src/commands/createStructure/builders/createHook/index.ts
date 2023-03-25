// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'

// Builders
import { createHookFiles } from './createFiles'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { promptForStructureName } from '../../../../prompts'
import { formatHookName, parseError } from '../../../../utils/functions'

export async function createHook(path: string, name?: string) {
  let inputName

  if (name) inputName = name
  else inputName = await promptForStructureName()

  if (!inputName)
    return window.showErrorMessage('Insert a valid name to continue')

  const { hookName } = formatHookName(inputName)

  try {
    const targetDirectory = `${path}/${hookName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    await createHookFiles(hookName, targetDirectory)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'

// Builders
import { createRouteFiles } from './createFiles'

// Utils
import {
  promptForRequestMethod,
  promptForStructureName
} from '../../../../prompts'
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'

export async function createRoute(path: string) {
  const method = await promptForRequestMethod()

  if (!method)
    return window.showErrorMessage('Select a valid option to continue')

  const routeName = await promptForStructureName()

  if (!routeName)
    return window.showErrorMessage('Insert a valid name to continue')

  try {
    const targetDirectory = `${path}/${routeName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    await createRouteFiles(routeName, targetDirectory, method)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

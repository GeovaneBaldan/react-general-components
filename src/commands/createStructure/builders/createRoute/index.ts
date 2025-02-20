// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'

// Builders
import { createRouteFiles } from './createFiles'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'
import { pickRequestMethod, pickStructureName } from '../../../../prompts'

export async function createRoute(path: string) {
  const method = await pickRequestMethod()

  if (!method)
    return window.showErrorMessage('Select a valid option to continue')

  const routeName = await pickStructureName()

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

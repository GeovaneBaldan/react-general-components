// External Libraries
import { Uri, window } from 'vscode'

// Builders
import { createRoute } from './builders'

// Utils
import { getDirectoryPath } from '../../utils/fs'
import { parseError } from '../../utils/functions'
import { promptForRequestMethod, promptForStructureType } from '../../prompts'

// Types
import { Structure } from '../../types/structure'

export async function createStructure(uri: Uri) {
  const structure = await promptForStructureType()

  if (!structure) return

  try {
    const targetPath = await getDirectoryPath(uri)
    handleCreateStructure(structure, targetPath)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

function handleCreateStructure(selection: Structure, path: string) {
  switch (selection) {
    case Structure.API_ROUTE:
      return handleRouteCreation(path)
    default:
      window.showErrorMessage('Select a valid option to continue')
  }
}

async function handleRouteCreation(path: string) {
  const method = await promptForRequestMethod()

  if (!method)
    return window.showErrorMessage('Select a valid option to continue')

  await createRoute(path, method)
}

// External Libraries
import { Uri, window } from 'vscode'

// Builders
import {
  createHook,
  createRoute,
  createContext,
  createComponent
} from './builders'

// Utils
import { getDirectoryPath } from '../../utils/fs'
import { parseError } from '../../utils/functions'
import { promptForStructureType } from '../../prompts'

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
      return createRoute(path)
    case Structure.CONTEXT:
      return createContext(path)
    case Structure.HOOK:
      return createHook(path)
    case Structure.COMPONENT:
      return createComponent(path)
    default:
      window.showErrorMessage('Select a valid option to continue')
  }
}

// External Libraries
import { Uri, window } from 'vscode'

// Builders
import {
  createHook,
  createModal,
  createRoute,
  createContext,
  createComponent
} from './builders'

// Utils
import { pickStructure } from '../../prompts'
import { getDirectoryPath } from '../../utils/fs'
import { parseError } from '../../utils/functions'

// Types
import { Structure } from '../../types/structure'
import { HookVariant } from '../../types/variant'

type CreateStructureParams = {
  targetPath: string
  structure: Structure
}

export async function createStructure(uri: Uri) {
  const structure = await pickStructure()
  if (!structure) return window.showErrorMessage('Select a valid structure')

  try {
    const targetPath = await getDirectoryPath(uri)
    handleCreateStructure({ structure, targetPath })
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

function handleCreateStructure(params: CreateStructureParams) {
  const { structure, targetPath } = params

  switch (structure) {
    case Structure.API_ROUTE:
      return createRoute(targetPath)
    case Structure.CONTEXT:
      return createContext(targetPath)
    case Structure.HOOK:
      return createHook({ path: targetPath, variant: HookVariant.DEFAULT })
    case Structure.COMPONENT:
      return createComponent(targetPath)
    case Structure.MODAL:
      return createModal(targetPath)
    default:
      window.showErrorMessage('Select a valid option to continue')
  }
}

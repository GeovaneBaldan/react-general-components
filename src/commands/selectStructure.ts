import { Uri, window } from 'vscode'

import {
  promptForScope,
  promptForStructureType,
  promptForRequestMethod
} from '../prompts'
import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { Structures } from '../constants/structures'
import { getSelectedDirectoryPath } from '../fs-utilities/getSelectedDirectoryPath'

// Commands
import { createHook } from './createHook'
import { createModal } from './createModal'
import { createContext } from './createContext'
import { createApiRoute } from './createApiRoute'
import { createComponent } from './createComponent'
import { createHookComponent } from './createHookComponent'

export async function selectStructure(uri: Uri) {
  const structure = await promptForStructureType()
  let targetDirectory = ''

  if (!structure || !isNameValid(structure)) return

  try {
    targetDirectory = await getSelectedDirectoryPath(uri)
    handleStructureSelection(structure, targetDirectory)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

async function handleStructureSelection(selection: string, target: string) {
  switch (selection) {
    case Structures.HOOK:
      return createHook(target)
    case Structures.CONTEXT:
      return createContext(target)
    case Structures.MODAL:
      return handleCreateComponent(target, Structures.MODAL)
    case Structures.DEFAULT_COMPONENT:
      return handleCreateComponent(target, Structures.DEFAULT_COMPONENT)
    case Structures.HOOK_COMPONENT:
      return handleCreateComponent(target, Structures.HOOK_COMPONENT)
    case Structures.API_ROUTE:
      return handleCreateApiRoute(target)
    default:
      window.showErrorMessage('Select a valid option to continue')
  }
}

async function handleCreateApiRoute(target: string) {
  const method = await promptForRequestMethod()

  if (!method) {
    window.showErrorMessage('Select a valid option to continue')
    return null
  }

  await createApiRoute(target, method)
}

async function handleCreateComponent(target: string, type: Structures) {
  const scope = await promptForScope()

  if (!scope) {
    window.showErrorMessage('Select a valid option to continue')
    return null
  }

  if (type === Structures.DEFAULT_COMPONENT) {
    await createComponent(target, scope)
  } else if (type === Structures.HOOK_COMPONENT) {
    await createHookComponent(target, scope)
  } else createModal(target, scope)
}

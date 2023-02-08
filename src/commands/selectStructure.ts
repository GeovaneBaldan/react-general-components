import { Uri, window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForStructureType } from '../prompts'
import { Structures } from '../constants/structures'
import { promptForScope } from '../prompts/promptForScope'
import { getSelectedDirectoryPath } from '../fs-utilities/getSelectedDirectoryPath'

// Commands
import { createHook } from './createHook'
import { createContext } from './createContext'
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
      return createContext()
    case Structures.DEFAULT_COMPONENT:
      return handleCreateComponent(target, Structures.DEFAULT_COMPONENT)
    case Structures.HOOK_COMPONENT:
      return handleCreateComponent(target, Structures.HOOK_COMPONENT)
    default:
      window.showErrorMessage('Select a valid option to continue')
  }
}

async function handleCreateComponent(target: string, type: Structures) {
  const scope = await promptForScope()

  if (!scope) {
    window.showErrorMessage('Select a valid option to continue')
    return null
  }

  if (type === Structures.DEFAULT_COMPONENT) {
    await createComponent(target, scope)
  } else await createHookComponent(target, scope)
}

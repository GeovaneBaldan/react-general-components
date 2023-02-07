import { Uri, window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForStructureType } from '../prompts'
import { getSelectedDirectoryPath } from '../fs-utilities/getSelectedDirectoryPath'
import { Structures } from '../constants/structures'

// Commands
import { createHook } from './createHook'
import { createContext } from './createContext'
import { promptForScope } from '../prompts/promptForScope'
import { createComponent } from './createComponent'

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
      return handleCreateDefaultComponent(target)
    default:
      window.showErrorMessage('Select a valid option to continue')
  }
}

async function handleCreateDefaultComponent(target: string) {
  const scope = await promptForScope()

  if (!scope) {
    window.showErrorMessage('Select a valid option to continue')
    return null
  }

  await createComponent(target, scope)
}

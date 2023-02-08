import { window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForFeatureName } from '../prompts'

import { buildContext } from '../builders/structures/buildContext'

export async function createContext(targetDirectory: string) {
  const componentName = await promptForFeatureName()

  if (!componentName || !isNameValid(componentName)) {
    return window.showErrorMessage('The name must not be empty')
  }

  try {
    await buildContext(componentName, targetDirectory)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

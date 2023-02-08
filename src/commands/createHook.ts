import { window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForFeatureName } from '../prompts'

import { buildHook } from '../builders/structures/buildHook'

export async function createHook(targetDirectory: string) {
  const componentName = await promptForFeatureName()

  if (!componentName || !isNameValid(componentName)) {
    return window.showErrorMessage('The name must not be empty')
  }

  try {
    await buildHook(componentName, targetDirectory)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

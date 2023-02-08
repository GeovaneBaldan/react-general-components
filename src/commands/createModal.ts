import { window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForFeatureName } from '../prompts'
import { ComponentTypes } from '../constants/componentTypes'

import { buildModal } from '../builders/structures/buildModal'

export async function createModal(
  targetDirectory: string,
  type: ComponentTypes
) {
  const componentName = await promptForFeatureName()

  if (!componentName || !isNameValid(componentName)) {
    return window.showErrorMessage('The name must not be empty')
  }

  try {
    await buildModal(componentName, targetDirectory, type)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

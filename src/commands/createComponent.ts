import { window } from 'vscode'

import { isNameValid } from '../validators'
import { capitalize, parseError } from '../utils'
import { promptForFeatureName } from '../prompts'
import { ComponentTypes } from '../constants/componentTypes'
import { buildReactComponent } from '../builders/structures/buildReactComponent'

export async function createComponent(
  targetDirectory: string,
  type: ComponentTypes
) {
  const componentName = await promptForFeatureName()

  if (!isNameValid(componentName)) {
    return window.showErrorMessage('The name must not be empty')
  }

  try {
    await buildReactComponent(capitalize(componentName), targetDirectory, type)
    window.showInformationMessage(`Successfully generated ${componentName}`)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

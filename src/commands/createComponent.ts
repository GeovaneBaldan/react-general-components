import { Uri, window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForFeatureName } from '../prompts'
import { getSelectedDirectoryPath } from '../fs-utilities/getSelectedDirectoryPath'
import { buildReactComponent } from '../builders/structures/component/buildReactComponent'

export async function createComponent(uri: Uri, type: 'web' | 'mobile') {
  const componentName = await promptForFeatureName()
  let targetDirectory = ''

  if (!isNameValid(componentName)) {
    return window.showErrorMessage('The name must not be empty')
  }

  try {
    targetDirectory = await getSelectedDirectoryPath(uri)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }

  try {
    await buildReactComponent(`${componentName}`, targetDirectory, type)
    window.showInformationMessage(`Successfully generated ${componentName}`)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

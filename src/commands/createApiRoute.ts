import { window } from 'vscode'

import { parseError } from '../utils'
import { isNameValid } from '../validators'
import { promptForFeatureName } from '../prompts'
import { ApiMethods } from '../constants/apiMethods'
import { buildApiRoute } from '../builders/structures/buildApiRoute'

export async function createApiRoute(target: string, method: ApiMethods) {
  const componentName = await promptForFeatureName()

  if (!componentName || !isNameValid(componentName)) {
    return window.showErrorMessage('The name must not be empty')
  }

  try {
    await buildApiRoute(componentName, target, method)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

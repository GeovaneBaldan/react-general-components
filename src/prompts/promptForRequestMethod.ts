import { QuickPickOptions, window } from 'vscode'

import { ApiMethods } from '../constants/apiMethods'

export function promptForRequestMethod(): Thenable<ApiMethods | undefined> {
  const options: QuickPickOptions = {
    canPickMany: false,
    placeHolder: 'Select api route request method'
  }

  const menuItems = Object.values(ApiMethods)
  return window.showQuickPick(menuItems, options) as Thenable<
    ApiMethods | undefined
  >
}

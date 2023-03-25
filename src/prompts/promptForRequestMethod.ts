// External Libraries
import { window, QuickPickOptions } from 'vscode'

// Types
import { ApiMethod } from '../types/apiMethod'

const CONFIG: QuickPickOptions = {
  placeHolder: 'Select the request method',
  title: 'Route method',
  canPickMany: false
}

export function promptForRequestMethod() {
  const menuItems = Object.values(ApiMethod)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<ApiMethod | undefined>
}

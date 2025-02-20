// External Libraries
import { window, QuickPickOptions } from 'vscode'

// Types
import { ApiMethod } from '../types/api-method'

const CONFIG: QuickPickOptions = {
  title: 'API request method',
  placeHolder: 'Select the request method',
  canPickMany: false,
  ignoreFocusOut: true
}

export function pickRequestMethod(): Thenable<ApiMethod | undefined> {
  const menuItems = Object.values(ApiMethod)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<ApiMethod | undefined>
}

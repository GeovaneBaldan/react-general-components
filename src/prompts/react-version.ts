// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { ReactVersion } from '../types/version'

const CONFIG: QuickPickOptions = {
  title: 'React Version',
  placeHolder: 'Select the project react version',
  ignoreFocusOut: true,
  canPickMany: false
}

export function pickReactVersion(): Thenable<ReactVersion | undefined> {
  const menuItems = Object.values(ReactVersion)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<ReactVersion | undefined>
}

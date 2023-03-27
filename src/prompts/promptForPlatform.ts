// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { Platform } from '../types/platform'

const CONFIG: QuickPickOptions = {
  placeHolder: 'Select the desired platform',
  title: 'Platform',
  ignoreFocusOut: true,
  canPickMany: false
}

export function promptForPlatform() {
  const menuItems = Object.values(Platform)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<Platform | undefined>
}

// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { Platform } from '../types/platform'

const CONFIG: QuickPickOptions = {
  title: 'Platform',
  placeHolder: 'Select the desired platform',
  ignoreFocusOut: true,
  canPickMany: false
}

export function pickPlatform(): Thenable<Platform | undefined> {
  const menuItems = Object.values(Platform)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<Platform | undefined>
}

import { QuickPickOptions, window } from 'vscode'
import { ComponentTypes } from '../constants/componentTypes'

export function promptForScope(): Thenable<ComponentTypes | undefined> {
  const options: QuickPickOptions = {
    canPickMany: false,
    placeHolder: 'Select the desired scope'
  }

  const menuItems = Object.values(ComponentTypes)
  return window.showQuickPick(menuItems, options) as Thenable<
    ComponentTypes | undefined
  >
}

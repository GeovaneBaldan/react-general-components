import { QuickPickOptions, window } from 'vscode'
import { Structures } from '../constants/structures'

export function promptForStructureType(): Thenable<string | undefined> {
  const options: QuickPickOptions = {
    canPickMany: false,
    placeHolder: 'Select the desired structure'
  }

  const menuItems = Object.values(Structures)
  return window.showQuickPick(menuItems, options)
}

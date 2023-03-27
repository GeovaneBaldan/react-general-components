// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { Structure } from '../types/structure'

const CONFIG: QuickPickOptions = {
  placeHolder: 'Select the desired structure',
  title: 'Structure',
  canPickMany: false
}

export function promptForStructureType() {
  const menuItems = Object.values(Structure)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<Structure | undefined>
}

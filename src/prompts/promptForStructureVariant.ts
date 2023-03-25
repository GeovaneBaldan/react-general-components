// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { StructureVariant } from '../types/structure'

const CONFIG: QuickPickOptions = {
  placeHolder: 'Select the desired variant',
  title: 'Structure variant',
  canPickMany: false
}

export function promptForStructureVariant() {
  const menuItems = Object.values(StructureVariant)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<StructureVariant | undefined>
}

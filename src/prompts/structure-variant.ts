// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { StructureVariant } from '../types/variant'

const CONFIG: QuickPickOptions = {
  title: 'Structure variant',
  placeHolder: 'Select the desired variant',
  canPickMany: false,
  ignoreFocusOut: true
}

export function pickStructureVariant(): Thenable<StructureVariant | undefined> {
  const menuItems = Object.values(StructureVariant)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<StructureVariant | undefined>
}

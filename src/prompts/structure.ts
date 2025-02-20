// External Libraries
import { QuickPickOptions, window } from 'vscode'

// Types
import { Structure } from '../types/structure'

const CONFIG: QuickPickOptions = {
  title: 'Structure',
  placeHolder: 'Select the desired structure',
  canPickMany: false,
  ignoreFocusOut: true
}

export function pickStructure(): Thenable<Structure | undefined> {
  const menuItems = Object.values(Structure)
  const selection = window.showQuickPick(menuItems, CONFIG)

  return selection as Thenable<Structure | undefined>
}

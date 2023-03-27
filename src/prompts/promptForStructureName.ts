// External Libraries
import { window, InputBoxOptions } from 'vscode'

const CONFIG: InputBoxOptions = {
  placeHolder: 'Insert the desired name',
  prompt: 'Structure name',
  ignoreFocusOut: true
}

export function promptForStructureName() {
  return window.showInputBox(CONFIG)
}

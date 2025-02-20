// External Libraries
import { window, InputBoxOptions } from 'vscode'

const CONFIG: InputBoxOptions = {
  prompt: 'Structure name',
  placeHolder: 'Insert the desired name',
  ignoreFocusOut: true
}

export function pickStructureName(): Thenable<string | undefined> {
  const result = window.showInputBox(CONFIG)
  return result
}

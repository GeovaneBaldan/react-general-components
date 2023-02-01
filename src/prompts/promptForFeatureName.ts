import { InputBoxOptions, window } from 'vscode'

export function promptForFeatureName(): Thenable<string | undefined> {
  const options: InputBoxOptions = {
    prompt: 'Feature Name',
    title: 'Insert feature name'
  }

  return window.showInputBox(options)
}

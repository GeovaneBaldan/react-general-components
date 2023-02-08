import { isNil, isEmpty } from 'lodash'
import { OpenDialogOptions, window } from 'vscode'

export async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    title: 'Select a folder to create the feature in',
    openLabel: 'Confirm',
    canSelectFolders: true,
    canSelectFiles: false
  }

  const uri = await window.showOpenDialog(options)

  if (isNil(uri) || isEmpty(uri)) return undefined
  return uri[0].fsPath
}

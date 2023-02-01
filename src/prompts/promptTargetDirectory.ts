import { isNil, isEmpty } from 'lodash'
import { OpenDialogOptions, window } from 'vscode'

export async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: 'Select a folder to create the feature in',
    canSelectFolders: true
  }

  const uri = await window.showOpenDialog(options)

  if (isNil(uri) || isEmpty(uri)) return undefined
  return uri[0].fsPath
}

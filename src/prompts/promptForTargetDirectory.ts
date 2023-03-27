// External Libraries
import { isNil, isEmpty } from 'lodash'
import { OpenDialogOptions, window } from 'vscode'

const CONFIG: OpenDialogOptions = {
  title: 'Select directory',
  openLabel: 'Confirm',
  canSelectMany: false,
  canSelectFiles: false,
  canSelectFolders: true
}

export async function promptForTargetDirectory() {
  const uri = await window.showOpenDialog(CONFIG)

  if (isNil(uri) || isEmpty(uri)) return undefined
  return uri[0].fsPath
}

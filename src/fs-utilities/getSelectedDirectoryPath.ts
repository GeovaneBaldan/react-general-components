import { Uri } from 'vscode'
import { lstatSync } from 'fs'
import { get, isNil } from 'lodash'

import { promptForTargetDirectory } from '../prompts'

export async function getSelectedDirectoryPath(uri: Uri) {
  let targetDirectory

  if (isNil(get(uri, 'fsPath')) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory()
    if (isNil(targetDirectory)) throw Error('Please select a valid directory')
  } else targetDirectory = uri.fsPath

  return targetDirectory
}

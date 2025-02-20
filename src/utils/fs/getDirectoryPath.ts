// External Libraries
import { Uri } from 'vscode'
import { lstatSync } from 'fs'
import { get, isNil } from 'lodash'

// Prompts
import { pickTargetDirectoryPath } from '../../prompts'

export async function getDirectoryPath(uri: Uri) {
  const isDirectory =
    !isNil(get(uri, 'fsPath')) || lstatSync(uri.fsPath).isDirectory()

  if (isDirectory) return uri.fsPath

  const path = await pickTargetDirectoryPath()
  if (isNil(path)) throw Error('Please select a valid directory')
  else return path
}

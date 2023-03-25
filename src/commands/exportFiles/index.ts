// External Libraries
import { Uri, window } from 'vscode'
import { readdir, writeFile } from 'fs/promises'

// Utils
import { getDirectoryPath } from '../../utils/fs'
import { parseError } from '../../utils/functions'

// Templates
import { getExportedFilesTemplate } from '../../templates/export'

export async function exportFiles(uri: Uri) {
  const targetDirectory = await getDirectoryPath(uri)

  const targetPath = `${targetDirectory}/index.ts`

  const files = await readdir(targetDirectory)
  const template = getExportedFilesTemplate(files)

  try {
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

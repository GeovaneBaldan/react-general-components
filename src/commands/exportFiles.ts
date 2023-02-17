import { Uri, window } from 'vscode'
import { readdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'

import { parseError } from '../utils'
import { buildExportTemplate } from '../templates/export'
import { getSelectedDirectoryPath } from '../fs-utilities/getSelectedDirectoryPath'

export async function exportFiles(uri: Uri) {
  const targetDirectory = await getSelectedDirectoryPath(uri)

  const targetPath = `${targetDirectory}/index.ts`

  const files = await readdir(targetDirectory)
  const template = buildExportTemplate(files)

  if (existsSync(targetPath)) {
    window.showErrorMessage(`[Export] An index already exists in this path.`)
  }

  try {
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (err) {
    const error = parseError(err)
    window.showErrorMessage(error)
  }
}

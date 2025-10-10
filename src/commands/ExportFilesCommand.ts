import * as vscode from 'vscode'
import * as path from 'node:path'

import { BaseCommand } from '../core/Command'
import type { FileSystemHelper } from '../utils/FileSystemHelper'

export class ExportFilesCommand extends BaseCommand {
  readonly id = 'general-components.exportFiles'
  readonly title = 'RGC: Export files'

  constructor(private fileSystem: FileSystemHelper) {
    super()
  }

  async execute(uri?: vscode.Uri): Promise<void> {
    try {
      const targetPath = await this.fileSystem.getDirectoryPath(uri)

      const files = await this.fileSystem.readExportableFiles(targetPath)

      if (files.length === 0) {
        vscode.window.showInformationMessage(
          'No exportable files found in the selected directory'
        )

        return
      }

      const template = this.generateExportTemplate(files)
      const indexPath = path.join(targetPath, 'index.ts')

      if (await this.fileSystem.fileExists(indexPath)) {
        const shouldOverwrite = await this.fileSystem.shouldOverwrite(indexPath)
        if (!shouldOverwrite) return
      }

      await this.fileSystem.writeFile(indexPath, template)

      await this.fileSystem.formatDocument(indexPath)

      vscode.window.showInformationMessage(
        `Exported ${files.length} file${files.length > 1 ? 's' : ''}`
      )
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error when exporting files: ${this.fileSystem.parseError(error)}`
      )
    }
  }

  private generateExportTemplate(files: string[]): string {
    return `${files.map(name => `export * from './${name}'`).join('\n')}\n`
  }
}

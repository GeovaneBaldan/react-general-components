// External libraries
import type * as vscode from 'vscode'
import { join } from 'node:path'

// Helpers
import { MessageHelper } from '../../helpers/message'
import type { FileSystemHelper } from '../../helpers/file-system'

// Types
import type { FileInfo } from '../../types'
import type { Command } from '../../core/Command'

export class ExportFilesCommand implements Command {
  readonly id = 'general-components.exportFiles'
  readonly title = 'RGC: Export files'

  constructor(private fs: FileSystemHelper) {}

  async execute(uri?: vscode.Uri): Promise<void> {
    try {
      const targetPath = await this.fs.getDirectoryPath(uri)
      const files = await this.fs.readExportableFiles(targetPath)

      if (files.length === 0) {
        MessageHelper.info(
          'No exportable files found in the selected directory'
        )

        return
      }

      const indexPath = join(targetPath, 'index.ts')

      const shouldOverwrite = await this.fs.shouldOverwrite(indexPath)
      if (!shouldOverwrite) return

      const template = this.generateExportTemplate(files)
      await this.fs.writeFile(indexPath, template)
      await this.fs.formatDocument(indexPath)

      MessageHelper.info(
        `${files.length} ${files.length > 1 ? 'files' : 'file'} exported`
      )
    } catch (error) {
      MessageHelper.error('Error when exporting files', error)
    }
  }

  private generateExportTemplate(files: FileInfo[]): string {
    const sortedFiles = [...files].sort((a, b) => a.name.length - b.name.length)
    return `${sortedFiles.map(file => `export * from './${file.name}'`).join('\n')}\n`
  }
}

// External libraries
import * as vscode from 'vscode'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

// Helpers
import { ExportFilesRules } from './rules'

// Types
import type { FileInfo } from '../../types'

export class FileSystemHelper {
  private readonly validExtensions = ['.tsx', '.ts', '.jsx', '.js']
  private readonly exportRules = new ExportFilesRules(this.validExtensions)

  async getDirectoryPath(uri?: vscode.Uri): Promise<string> {
    if (uri) return this.resolvePathFromUri(uri)

    const folders = this.getWorkspaceFolders()
    if (folders.length === 1) return folders[0].uri.fsPath

    const selected = await this.pickWorkspaceFolder()
    return selected.uri.fsPath
  }

  async readDirectoryInfo(dirPath: string): Promise<FileInfo[]> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })

    return entries.map(entry => {
      const extension = path.extname(entry.name)
      const fullPath = path.join(dirPath, entry.name)

      return {
        extension,
        path: fullPath,
        fullName: entry.name,
        isDirectory: entry.isDirectory(),
        name: this.getFileName(entry.name)
      }
    })
  }

  async readExportableFiles(dirPath: string): Promise<FileInfo[]> {
    const files = await this.readDirectoryInfo(dirPath)

    return files.filter(file => this.exportRules.isExportable(file))
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, { encoding: 'utf-8' })
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, fs.constants.F_OK)
      return true
    } catch (error: any) {
      if (error?.code === 'ENOENT') return false
      throw error
    }
  }

  async formatDocument(filePath: string): Promise<void> {
    const document = await vscode.workspace.openTextDocument(filePath)

    const edits = await vscode.commands.executeCommand<vscode.TextEdit[]>(
      'vscode.executeFormatDocumentProvider',
      document.uri
    )

    if (!edits || edits.length === 0) return

    const workspaceEdit = new vscode.WorkspaceEdit()

    for (const edit of edits) {
      workspaceEdit.replace(document.uri, edit.range, edit.newText)
    }

    await vscode.workspace.applyEdit(workspaceEdit)
    await document.save()
  }

  async shouldOverwrite(filePath: string): Promise<boolean> {
    const exists = await this.fileExists(filePath)
    if (!exists) return true

    return this.confirmOverwrite(path.basename(filePath))
  }

  private async confirmOverwrite(fileName: string): Promise<boolean> {
    const answer = await vscode.window.showWarningMessage(
      `The file ${fileName} already exists. Do you want to overwrite?`,
      { modal: true },
      'Overwrite'
    )

    return answer === 'Overwrite'
  }

  private async resolvePathFromUri(uri: vscode.Uri): Promise<string> {
    if (!uri.fsPath) throw new Error('Invalid resource')

    const stat = await fs.stat(uri.fsPath)
    return stat.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath)
  }

  private getWorkspaceFolders(): readonly vscode.WorkspaceFolder[] {
    const folders = vscode.workspace.workspaceFolders

    if (!folders || folders.length === 0)
      throw new Error('No open workspaces found')

    return folders
  }

  private async pickWorkspaceFolder(): Promise<vscode.WorkspaceFolder> {
    const selected = await vscode.window.showWorkspaceFolderPick({
      ignoreFocusOut: true,
      placeHolder: 'Select destination folder'
    })

    if (!selected) throw new Error('No folder selected')

    return selected
  }

  private getFileName(filename: string): string {
    const extension = this.validExtensions.find(ext => filename.endsWith(ext))

    if (extension) return filename.slice(0, -extension.length)
    return path.parse(filename).name
  }
}

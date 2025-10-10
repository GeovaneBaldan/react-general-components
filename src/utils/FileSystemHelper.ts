import * as vscode from 'vscode'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

export interface FileInfo {
  name: string
  fullName: string
  extension: string
  isDirectory: boolean
  path: string
}

export class FileSystemHelper {
  private readonly validExtensions = ['.tsx', '.ts', '.jsx', '.js']

  async getDirectoryPath(uri?: vscode.Uri): Promise<string> {
    if (uri?.fsPath) {
      const stat = await fs.stat(uri.fsPath)
      return stat.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath)
    }

    const folders = vscode.workspace.workspaceFolders

    if (!folders || folders.length === 0) {
      throw new Error('No open workspaces found')
    }

    if (folders.length === 1) return folders[0].uri.fsPath

    const selected = await vscode.window.showWorkspaceFolderPick({
      placeHolder: 'Select destination folder'
    })

    if (!selected) throw new Error('No folder selected')

    return selected.uri.fsPath
  }

  async readDirectory(path: string): Promise<string[]> {
    try {
      const files = await fs.readdir(path)
      return files
    } catch (error) {
      throw new Error(`Failed to read directory: ${this.parseError(error)}`)
    }
  }

  async readDirectoryInfo(dirPath: string): Promise<FileInfo[]> {
    const files = await this.readDirectory(dirPath)
    const fileInfos: FileInfo[] = []

    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const stat = await fs.stat(filePath)
      const ext = path.extname(file)

      fileInfos.push({
        fullName: file,
        extension: ext,
        path: filePath,
        name: this.getFileName(file),
        isDirectory: stat.isDirectory()
      })
    }

    return fileInfos
  }

  async readExportableFiles(dirPath: string): Promise<string[]> {
    const fileInfos = await this.readDirectoryInfo(dirPath)

    return fileInfos
      .filter(
        file =>
          !file.isDirectory &&
          file.name !== 'index' &&
          !file.name.startsWith('.') &&
          this.validExtensions.includes(file.extension)
      )
      .map(file => file.name)
  }

  getFileName(filename: string): string {
    const extension = this.validExtensions.find(ext => filename.endsWith(ext))

    if (extension) return filename.slice(0, -extension.length)
    return path.parse(filename).name
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  async directoryExists(dirPath: string): Promise<boolean> {
    try {
      const stat = await fs.stat(dirPath)
      return stat.isDirectory()
    } catch {
      return false
    }
  }

  async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true })
    } catch (error) {
      throw new Error(`Error creating directory: ${this.parseError(error)}`)
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.writeFile(filePath, content, { encoding: 'utf-8' })
    } catch (error) {
      throw new Error(`Error writing file: ${this.parseError(error)}`)
    }
  }

  async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch (error) {
      throw new Error(`Error reading file: ${this.parseError(error)}`)
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath)
    } catch (error) {
      throw new Error(`Error deleting file: ${this.parseError(error)}`)
    }
  }

  async shouldOverwrite(filePath: string): Promise<boolean> {
    const exists = await this.fileExists(filePath)
    if (!exists) return true

    const answer = await vscode.window.showWarningMessage(
      `The file ${path.basename(filePath)} already exists. Do you want to overwrite?`,
      'Yes',
      'No'
    )

    return answer === 'Yes'
  }

  async createFiles(
    basePath: string,
    files: Array<{ fileName: string; content: string }>,
    overwrite: boolean = false
  ): Promise<void> {
    for (const file of files) {
      const filePath = path.join(basePath, file.fileName)

      if (!overwrite && (await this.fileExists(filePath))) {
        const shouldOverwrite = await this.shouldOverwrite(filePath)
        if (!shouldOverwrite) continue
      }

      await this.writeFile(filePath, file.content)
    }
  }

  async openFile(filePath: string): Promise<void> {
    const document = await vscode.workspace.openTextDocument(filePath)
    await vscode.window.showTextDocument(document)
  }

  async formatDocument(filePath: string): Promise<void> {
    try {
      const document = await vscode.workspace.openTextDocument(filePath)
      const edits = await vscode.commands.executeCommand<vscode.TextEdit[]>(
        'vscode.executeFormatDocumentProvider',
        document.uri
      )

      if (edits && edits.length > 0) {
        const edit = new vscode.WorkspaceEdit()
        edits.forEach(e => edit.replace(document.uri, e.range, e.newText))
        await vscode.workspace.applyEdit(edit)
        await document.save()
      }
    } catch (error) {
      console.warn('It was not possible to format the document:', error)
    }
  }

  validateName(name: string): string | null {
    if (!name || name.trim().length === 0) return 'The name cannot be empty'

    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
      return 'The name must start with a letter and contain only letters, numbers, _ or -'
    }

    return null
  }

  toPascalCase(str: string): string {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^\w/, c => c.toUpperCase())
  }

  toCamelCase(str: string): string {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^\w/, c => c.toLowerCase())
  }

  toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

  parseError(error: unknown): string {
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'Erro desconhecido'
  }
}

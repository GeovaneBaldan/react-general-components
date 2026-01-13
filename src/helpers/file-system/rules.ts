// Types
import type { FileInfo } from '../../types'

export class ExportFilesRules {
  constructor(private readonly validExtensions: string[]) {}

  isExportable(file: FileInfo): boolean {
    return (
      this.isRegularFile(file) &&
      this.isNotIndexFile(file) &&
      this.isNotHiddenFile(file) &&
      this.hasValidExtension(file)
    )
  }

  private isRegularFile(file: FileInfo): boolean {
    return !file.isDirectory
  }

  private isNotIndexFile(file: FileInfo): boolean {
    return file.name !== 'index'
  }

  private isNotHiddenFile(file: FileInfo): boolean {
    return !file.name.startsWith('.')
  }

  private hasValidExtension(file: FileInfo): boolean {
    return this.validExtensions.includes(file.extension)
  }
}

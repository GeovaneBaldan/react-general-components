// External libraries
import type * as vscode from 'vscode'

// Help
import { CommandRegistry } from './core/CommandRegistry'
import { FileSystemHelper } from './helpers/file-system'

// Commands
import { ExportFilesCommand } from './commands/export-files'

export function activate(context: vscode.ExtensionContext) {
  const registry = new CommandRegistry()
  const fileSystem = new FileSystemHelper()

  registry.registerAll([new ExportFilesCommand(fileSystem)])

  registry.bind(context)
}

export function deactivate() {}

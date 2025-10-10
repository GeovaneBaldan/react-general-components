import * as vscode from 'vscode'

import { CommandRegistry } from './core/CommandRegistry'
import { FileSystemHelper } from './utils/FileSystemHelper'
import { ExportFilesCommand } from './commands/ExportFilesCommand'

export function activate(context: vscode.ExtensionContext) {
  const registry = new CommandRegistry()
  const fileSystem = new FileSystemHelper()

  registry.registerAll([new ExportFilesCommand(fileSystem)])

  registry.getAllCommands().forEach(command => {
    const disposable = vscode.commands.registerCommand(command.id, (...args) =>
      command.execute(...args)
    )

    context.subscriptions.push(disposable)
  })
}

export function deactivate() {}

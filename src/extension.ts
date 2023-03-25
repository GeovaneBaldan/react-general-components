// External Libraries
import * as vscode from 'vscode'

// Commands
import { exportFiles, createStructure } from './commands'

// This method is called when your extension is activated
export function activate(_context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    'general-components.createStructure',
    (uri: vscode.Uri) => createStructure(uri)
  )

  vscode.commands.registerCommand(
    'general-components.exportFiles',
    (uri: vscode.Uri) => exportFiles(uri)
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}

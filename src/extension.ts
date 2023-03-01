import * as vscode from 'vscode'

import { exportFiles } from './commands/exportFiles'
import { selectStructure } from './commands/selectStructure'

// This method is called when your extension is activated
export function activate(_context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    'general-components.createStructure',
    (uri: vscode.Uri) => selectStructure(uri)
  )

  vscode.commands.registerCommand(
    'general-components.exportFiles',
    (uri: vscode.Uri) => exportFiles(uri)
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}

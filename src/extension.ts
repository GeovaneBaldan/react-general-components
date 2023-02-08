import * as vscode from 'vscode'
import { selectStructure } from './commands/selectStructure'

// This method is called when your extension is activated
export function activate(_context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    'general-components.createStructure',
    (uri: vscode.Uri) => selectStructure(uri)
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}

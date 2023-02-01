import * as vscode from 'vscode'
import { createComponent } from './commands/createComponent'

// This method is called when your extension is activated
export function activate(_context: vscode.ExtensionContext) {
  vscode.commands.registerCommand(
    'general-components.createWebComponent',
    (uri: vscode.Uri) => createComponent(uri, 'web')
  )

  vscode.commands.registerCommand(
    'general-components.createMobileComponent',
    (uri: vscode.Uri) => createComponent(uri, 'mobile')
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}

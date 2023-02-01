import * as vscode from 'vscode'

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'general-components.helloWorld',
    () => {
      vscode.window.showInformationMessage(
        'Hello World from general-components!'
      )
    }
  )

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}

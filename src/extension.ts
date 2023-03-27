// External Libraries
import { Uri, ExtensionContext, commands } from 'vscode'

// Commands
import { exportFiles, createStructure } from './commands'

// This method is called when your extension is activated
export function activate(_context: ExtensionContext) {
  commands.registerCommand('general-components.createStructure', (uri: Uri) =>
    createStructure(uri)
  )

  commands.registerCommand('general-components.exportFiles', (uri: Uri) =>
    exportFiles(uri)
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}

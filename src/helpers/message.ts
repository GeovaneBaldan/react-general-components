// External libraries
import * as vscode from 'vscode'

export class MessageHelper {
  static info(message: string): void {
    vscode.window.showInformationMessage(message)
  }

  static warn(message: string): void {
    vscode.window.showWarningMessage(message)
  }

  static error(message: string, error?: unknown): void {
    const parsed = error ? MessageHelper.parseError(error) : undefined
    vscode.window.showErrorMessage(parsed ? `${message}: ${parsed}` : message)
  }

  static async confirm(
    message: string,
    options: { yes?: string; no?: string } = {}
  ): Promise<boolean> {
    const yes = options.yes ?? 'Yes'
    const no = options.no ?? 'No'

    const answer = await vscode.window.showWarningMessage(message, yes, no)

    return answer === yes
  }

  static parseError(error: unknown): string {
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    try {
      return JSON.stringify(error)
    } catch {
      return 'Unknown error'
    }
  }
}

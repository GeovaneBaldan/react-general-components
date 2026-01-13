import * as vscode from 'vscode'
import type { Command } from './Command'

export class CommandRegistry {
  private commands = new Map<string, Command>()

  register(command: Command): void {
    this.commands.set(command.id, command)
  }

  registerAll(commands: Command[]): void {
    commands.forEach(cmd => this.register(cmd))
  }

  bind(context: vscode.ExtensionContext) {
    this.commands.forEach(command => {
      const disposable = vscode.commands.registerCommand(
        command.id,
        (...args) => command.execute(...args)
      )

      context.subscriptions.push(disposable)
    })
  }
}

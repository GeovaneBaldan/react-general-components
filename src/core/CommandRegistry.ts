import type { ICommand } from './Command'

export class CommandRegistry {
  private commands = new Map<string, ICommand>()

  register(command: ICommand): void {
    this.commands.set(command.id, command)
  }

  registerAll(commands: ICommand[]): void {
    commands.forEach(cmd => this.register(cmd))
  }

  get(id: string): ICommand | undefined {
    return this.commands.get(id)
  }

  getAllCommands(): ICommand[] {
    return Array.from(this.commands.values())
  }
}

/** biome-ignore-all lint/suspicious/noExplicitAny: Multiple arguments are allowed */

export interface ICommand {
  readonly id: string
  readonly title: string
  execute(...args: any[]): Promise<void>
}

export abstract class BaseCommand implements ICommand {
  abstract readonly id: string
  abstract readonly title: string
  abstract execute(...args: any[]): Promise<void>
}

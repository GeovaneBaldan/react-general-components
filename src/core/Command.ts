export interface Command {
  readonly id: string
  readonly title: string

  execute(...args: any[]): Promise<void>
}

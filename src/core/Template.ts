export interface TemplateOptions {
  name: string
  path: string
  [key: string]: any
}

export interface ITemplate {
  readonly name: string
  readonly fileExtension: string
  getFileName(name: string): string
  generate(options: TemplateOptions): string
}

export abstract class BaseTemplate implements ITemplate {
  abstract readonly name: string
  abstract readonly fileExtension: string

  abstract generate(options: TemplateOptions): string

  getFileName(name: string): string {
    return `${name}.${this.fileExtension}`
  }
}

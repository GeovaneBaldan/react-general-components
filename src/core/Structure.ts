import type { ITemplate, TemplateOptions } from './Template'

export interface FileDefinition {
  fileName: string
  template: ITemplate
  options?: Record<string, any>
}

export interface IStructure {
  readonly name: string
  readonly type: 'web' | 'mobile'
  getFiles(options: TemplateOptions): FileDefinition[]
}

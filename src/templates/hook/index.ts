// Templates
import { getHookTypesTemplate } from './types'
import { getHookFunctionTemplate } from './component'

export function getHookTemplate(name: string) {
  const functionTemplate = getHookFunctionTemplate(name)
  const types = getHookTypesTemplate(name)

  return { function: functionTemplate, types }
}

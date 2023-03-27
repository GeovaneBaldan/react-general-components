// Templates
import { getHookTemplate } from './hook'
import { getHookTypesTemplate } from './hookTypes'
import { getHookModalTemplate } from './component'
import { getHookModalTypesTemplate } from './types'

export function getHookModalTemplates(name: string) {
  const component = getHookModalTemplate(name)
  const types = getHookModalTypesTemplate(name)

  const hook = getHookTemplate(name)
  const hookTypes = getHookTypesTemplate(name)

  return { component, types, hook, hookTypes }
}

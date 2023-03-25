// Templates
import { getDefaultModalTemplate } from './component'
import { getDefaultModalTypesTemplate } from './types'

export function getDefaultModalTemplates(name: string) {
  const component = getDefaultModalTemplate(name)
  const types = getDefaultModalTypesTemplate(name)

  return { component, types }
}

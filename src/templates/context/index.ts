// Templates
import { getContextTypesTemplate } from './types'
import { getContextComponentTemplate } from './component'

export function getContextTemplate(name: string) {
  const component = getContextComponentTemplate(name)
  const types = getContextTypesTemplate(name)

  return { component, types }
}

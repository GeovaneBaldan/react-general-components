// Templates
import { getContextTypesTemplate } from './types'
import { getContextComponentTemplate } from './component'

// Types
import { ReactVersion } from '../../types/version'

export function getContextTemplate(name: string, reactVersion: ReactVersion) {
  const component = getContextComponentTemplate(name, reactVersion)
  const types = getContextTypesTemplate(name)

  return { component, types }
}

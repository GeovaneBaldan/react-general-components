// Templates
import { getRouteTypesTemplate } from './types'
import { getFunctionTemplate } from './function'

// Types
import { ApiMethod } from '../../types/apiMethod'

export function getRouteTemplate(name: string, method: ApiMethod) {
  const functionTemplate = getFunctionTemplate(name, method)
  const types = getRouteTypesTemplate(name)

  return { functionTemplate, types }
}

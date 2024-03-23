// Templates
import { getFunctionTemplate } from './function'

// Types
import { ApiMethod } from '../../types/apiMethod'
import { getRouteRequestTemplate } from './request'
import { getRouteResponseTemplate } from './response'

export function getRouteTemplate(name: string, method: ApiMethod) {
  const functionTemplate = getFunctionTemplate(name, method)
  const request = getRouteRequestTemplate(name)
  const response = getRouteResponseTemplate(name)

  return { functionTemplate, request, response }
}

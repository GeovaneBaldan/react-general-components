import { ApiMethods } from '../../types'

export function getApiFunctionTemplate(
  componentName: string,
  method: ApiMethods
) {
  return `
// Types
import {  } from './types.ts'

export async function ${componentName}(params: {PARAMS_INTERFACE}): Promise<{RESPONSE_INTERFACE}> {
  const {  } = params
  const url = ''

  const response = await API.${method}(url)
  return response.data
}
`
}

import { ApiMethods } from '../../types'

export function getApiTypesTemplate(componentName: string, method: ApiMethods) {
  return `
export interface ${componentName}Params {
  // Params
}

export interface ${componentName}Response {
  // Props
}
`
}

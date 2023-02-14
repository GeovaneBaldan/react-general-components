import { formatApiName } from '../../utils'

export function getApiTypesTemplate(componentName: string) {
  const { paramsName, responseName } = formatApiName(componentName)

  return `
export interface ${paramsName} {
  // Params
}

export interface ${responseName} {
  // Props
}
`
}

// Utils
import { formatApiName } from '../../utils/functions'

export function getRouteTypesTemplate(name: string) {
  const { paramsName, responseName } = formatApiName(name)

  return `export interface ${paramsName} {
  // Route Params
}

export interface ${responseName} {
  // Request Response
}
`
}

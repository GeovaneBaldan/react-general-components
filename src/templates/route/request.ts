// Utils
import { formatApiName } from '../../utils/functions'

export function getRouteRequestTemplate(name: string) {
  const { paramsName } = formatApiName(name)

  return `export interface ${paramsName} {
  // Route Params
}
`
}

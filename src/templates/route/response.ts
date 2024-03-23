// Utils
import { formatApiName } from '../../utils/functions'

export function getRouteResponseTemplate(name: string) {
  const { responseName } = formatApiName(name)

  return `export interface ${responseName} {
  // Request Response
}
`
}

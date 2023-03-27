// Utils
import { formatHookName } from '../../utils/functions'

export function getHookTypesTemplate(name: string) {
  const { interfaceName } = formatHookName(name)

  return `export interface ${interfaceName}Params {
  // Params
}
`
}

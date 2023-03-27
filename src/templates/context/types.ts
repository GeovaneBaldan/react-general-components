// Utils
import { formatContextName } from '../../utils/functions'

export function getContextTypesTemplate(name: string) {
  const { interfaceName } = formatContextName(name)

  return `export interface ${interfaceName} {
  // Context Data
}
`
}

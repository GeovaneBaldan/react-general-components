import { formatContextName } from '../../utils'

export function getContextTypesTemplate(componentName: string) {
  const { interfaceName } = formatContextName(componentName)

  return `
export interface ${interfaceName} {
  // Context Data
}
`
}

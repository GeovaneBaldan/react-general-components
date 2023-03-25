// Utils
import { formatHookName } from '../../../utils/functions'

export function getHookTypesTemplate(componentName: string) {
  const { interfaceName } = formatHookName(componentName)

  return `export type ${interfaceName}Params = ${componentName}Props
`
}

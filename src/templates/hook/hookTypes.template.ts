import { formatHookName } from '../../utils'

export function getHookTypesTemplate(componentName: string) {
  const { interfaceName } = formatHookName(componentName)

  return `
    export interface ${interfaceName}Params {
      // Params
    }

    export interface ${interfaceName}Response {
      // Response
    }
  `
}

import { formatHookName } from '../../utils'

export function getHookTemplate(componentName: string) {
  const { hookName, interfaceName } = formatHookName(componentName)

  return `
    // Types
    import { ${interfaceName}Params, ${interfaceName}Response } from './types'

    export function ${hookName}({}: ${interfaceName}Params): ${interfaceName}Response {
      // States

      // Functions

      return {}
    }
  `
}

import { formatHookName } from '../../utils'

export function getHookTemplate(componentName: string) {
  const { hookName, interfaceName } = formatHookName(componentName)

  return `
    // Types
    import { ${interfaceName}Params, ${interfaceName}Return } from './types'

    export function ${hookName}({}: ${interfaceName}Params): ${interfaceName}Return {
      // States

      // Functions

      return {}
    }
  `
}

// Utils
import { formatHookName } from '../../utils/functions'

export function getHookFunctionTemplate(name: string) {
  const { hookName, interfaceName } = formatHookName(name)

  return `// Types
import { ${interfaceName}Params } from './types'

export function ${hookName}({}: ${interfaceName}Params) {
  // States

  // Functions

  return {}
}
`
}

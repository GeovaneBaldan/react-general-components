// Utils
import { formatHookName } from '../../../utils/functions'

export function getHookTypesTemplate(componentName: string) {
  const { interfaceName } = formatHookName(componentName)
  const propsName = getPropsName(componentName)

  return `import { ${propsName} } from '../../../types'

export type ${interfaceName}Params = ${propsName}
`
}

function getPropsName(name: string) {
  let propsName = name

  if (propsName.startsWith('use')) {
    propsName = propsName.replace(/^use/i, '')
    propsName = `${propsName}Modal`
  }

  return `${propsName}Props`
}

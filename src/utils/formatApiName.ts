import { capitalize } from './capitalize'

export function formatApiName(componentName: string) {
  let interfaceName = capitalize(componentName)

  if (!/^(https)/i.test(componentName)) interfaceName = `Https${interfaceName}`

  return {
    functionName: componentName,
    paramsName: `${interfaceName}Params`,
    responseName: `${interfaceName}Response`
  }
}

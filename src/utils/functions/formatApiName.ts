// Utils
import { capitalize } from './capitalize'

export function formatApiName(routeName: string) {
  let interfaceName = capitalize(routeName)

  const startWithHttp = /^(https)/i.test(routeName)
  if (!startWithHttp) interfaceName = `Https${interfaceName}`

  return {
    functionName: routeName,
    paramsName: `${interfaceName}Params`,
    responseName: `${interfaceName}Response`
  }
}

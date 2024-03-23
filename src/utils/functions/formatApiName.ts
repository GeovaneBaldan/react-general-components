// Utils
import { capitalize } from './capitalize'

export function formatApiName(routeName: string) {
  let interfaceName = capitalize(routeName)

  const startWithHttp = /^(http)/i.test(routeName)
  if (!startWithHttp) interfaceName = `Http${interfaceName}`

  return {
    functionName: routeName,
    paramsName: `${interfaceName}Params`,
    responseName: `HttpResponse`
  }
}

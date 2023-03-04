import { ApiMethods } from '../../constants/apiMethods'
import { formatApiName } from '../../utils'

export function getApiFunctionTemplate(
  componentName: string,
  method: ApiMethods
) {
  const { functionName, paramsName, responseName } =
    formatApiName(componentName)

  return `// Types
import { ${paramsName}, ${responseName} } from './types'

export async function ${functionName}(params: ${paramsName}): Promise<{}> {
  const {  } = params
  const url = ''

  const response = await API.${method.toLowerCase()}<${responseName}>(url)
  return response.data
}
`
}

// Utils
import { formatApiName } from '../../utils/functions'

// Types
import { ApiMethod } from '../../types/apiMethod'

export function getFunctionTemplate(name: string, method: ApiMethod) {
  const { functionName, paramsName, responseName } = formatApiName(name)

  return `// Services
import { API } from '@services/api'

// Types
import { ${responseName} } from './response'
import { ${paramsName} } from './request'

export async function ${functionName}(params: ${paramsName}) {
  const {  } = params
  const url = ''

  const response = await API.${method.toLowerCase()}<${responseName}>(url)
  return response.data
}
`
}

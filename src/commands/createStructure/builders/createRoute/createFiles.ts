// External Libraries
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Utils
import { parseError } from '../../../../utils/functions'
import { getRouteTemplate } from '../../../../templates/route'

// Types
import { ApiMethod } from '../../../../types/apiMethod'

export async function createRouteFiles(
  name: string,
  path: string,
  method: ApiMethod
) {
  const requestPath = `${path}/request.ts`
  const responsePath = `${path}/response.ts`
  const functionPath = `${path}/index.ts`

  const pathsExists =
    existsSync(functionPath) ||
    existsSync(requestPath) ||
    existsSync(responsePath)

  if (pathsExists)
    throw Error(`[ApiRoute] ${name} already exists in this path.`)

  try {
    const { functionTemplate, response, request } = getRouteTemplate(
      name,
      method
    )

    await writeFile(requestPath, request, { encoding: 'utf-8' })
    await writeFile(responsePath, response, { encoding: 'utf-8' })
    await writeFile(functionPath, functionTemplate, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error(`[ApiRoute] ${parseError(error)}`)
  }
}

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
  const typesPath = `${path}/types.ts`
  const functionPath = `${path}/index.ts`

  if (existsSync(functionPath) || existsSync(typesPath))
    throw Error(`[ApiRoute] ${name} already exists in this path.`)

  try {
    const { functionTemplate, types } = getRouteTemplate(name, method)

    await writeFile(typesPath, types, { encoding: 'utf-8' })
    await writeFile(functionPath, functionTemplate, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error(`[ApiRoute] ${parseError(error)}`)
  }
}

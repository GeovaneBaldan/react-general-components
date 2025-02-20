// External Libraries
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Utils
import { parseError } from '../../../../utils/functions'
import { getContextTemplate } from '../../../../templates/context'

// Types
import { ReactVersion } from '../../../../types/version'

type CreateContextFilesParams = {
  name: string
  path: string
  reactVersion: ReactVersion
}

export async function createContextFiles(params: CreateContextFilesParams) {
  const { name, path, reactVersion } = params
  const typesPath = `${path}/types.ts`
  const contextPath = `${path}/index.tsx`

  if (existsSync(contextPath) || existsSync(typesPath))
    throw Error(`[Context] ${name} already exists in this path.`)

  try {
    const { component, types } = getContextTemplate(name, reactVersion)

    await writeFile(typesPath, types, { encoding: 'utf-8' })
    await writeFile(contextPath, component, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error(`[Context] ${parseError(error)}`)
  }
}

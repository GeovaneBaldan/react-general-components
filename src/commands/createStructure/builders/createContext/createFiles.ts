// External Libraries
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Utils
import { parseError } from '../../../../utils/functions'
import { getContextTemplate } from '../../../../templates/context'

export async function createContextFiles(name: string, path: string) {
  const typesPath = `${path}/types.ts`
  const contextPath = `${path}/index.tsx`

  if (existsSync(contextPath) || existsSync(typesPath))
    throw Error(`[Context] ${name} already exists in this path.`)

  try {
    const { component, types } = getContextTemplate(name)

    await writeFile(typesPath, types, { encoding: 'utf-8' })
    await writeFile(contextPath, component, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error(`[Context] ${parseError(error)}`)
  }
}

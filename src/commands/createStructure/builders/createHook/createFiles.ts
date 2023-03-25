// External Libraries
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Utils
import { getHookTemplate } from '../../../../templates/hook'

export async function createHookFiles(name: string, path: string) {
  const functionPath = `${path}/index.ts`
  const typesPath = `${path}/types.ts`

  if (existsSync(functionPath) || existsSync(typesPath))
    throw Error(`[Hook] ${name} already exists in this path.`)

  try {
    const { functionTemplate, types } = getHookTemplate(name)

    await writeFile(functionPath, functionTemplate, { encoding: 'utf-8' })
    await writeFile(typesPath, types, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

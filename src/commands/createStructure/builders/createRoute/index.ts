// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'
import { promptForStructureName } from '../../../../prompts'

// Templates
import { getRouteTemplate } from '../../../../templates/route'

// Types
import { ApiMethod } from '../../../../types/apiMethod'

export async function createRoute(path: string, method: ApiMethod) {
  const routeName = await promptForStructureName()

  if (!routeName)
    return window.showErrorMessage('Insert a valid name to continue')

  try {
    const targetDirectory = `${path}/${routeName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    await createRouteFiles(routeName, targetDirectory, method)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

async function createRouteFiles(name: string, path: string, method: ApiMethod) {
  const typesPath = `${path}/types.ts`
  const functionPath = `${path}/index.ts`

  if (existsSync(functionPath) || existsSync(typesPath))
    throw Error(`[ApiRoute] ${name} already exists in this path.`)

  try {
    const { functionTemplate, types } = getRouteTemplate(name, method)

    await writeFile(typesPath, types, { encoding: 'utf-8' })
    await writeFile(functionPath, functionTemplate, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error('[ApiRoute] An error occurred while creating route files')
  }
}

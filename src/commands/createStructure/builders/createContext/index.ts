// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'

// Builders
import { createContextFiles } from './createFiles'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { pickReactVersion, pickStructureName } from '../../../../prompts'
import { formatContextName, parseError } from '../../../../utils/functions'

export async function createContext(path: string) {
  const reactVersion = await pickReactVersion()

  if (!reactVersion)
    return window.showErrorMessage('Select a valid react version')

  const inputName = await pickStructureName()

  if (!inputName)
    return window.showErrorMessage('Insert a valid name to continue')

  try {
    const { contextName } = formatContextName(inputName)
    const targetDirectory = `${path}/${contextName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    const params = { name: contextName, path: targetDirectory, reactVersion }
    await createContextFiles(params)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

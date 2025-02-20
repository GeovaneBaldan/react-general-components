// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'

// Builders
import { createContextFiles } from './createFiles'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { pickStructureName } from '../../../../prompts'
import { formatContextName, parseError } from '../../../../utils/functions'

export async function createContext(path: string) {
  const inputName = await pickStructureName()

  if (!inputName)
    return window.showErrorMessage('Insert a valid name to continue')

  try {
    const { contextName } = formatContextName(inputName)
    const targetDirectory = `${path}/${contextName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    await createContextFiles(contextName, targetDirectory)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

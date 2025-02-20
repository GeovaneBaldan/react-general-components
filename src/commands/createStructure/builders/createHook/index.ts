// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'

// Builders
import { createHookFiles } from './createFiles'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { pickStructureName } from '../../../../prompts'
import { formatHookName, parseError } from '../../../../utils/functions'

// Types
import { HookVariant } from '../../../../types/variant'

interface ICreateHookParams {
  path: string
  name?: string
  variant: HookVariant
}

export async function createHook(params: ICreateHookParams) {
  const { name, path, variant } = params
  let inputName

  if (name) inputName = name
  else inputName = await pickStructureName()

  if (!inputName)
    return window.showErrorMessage('Insert a valid name to continue')

  const { hookName } = formatHookName(inputName, variant)

  try {
    const targetDirectory = `${path}/${hookName}`
    if (!existsSync(targetDirectory)) await createDirectory(targetDirectory)

    await createHookFiles(hookName, targetDirectory, variant)
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

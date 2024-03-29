// External Libraries
import { window } from 'vscode'
import { writeFile } from 'fs/promises'

// Builders
import { createHook } from '../createHook'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'
import { getModalTemplate } from '../../../../templates/modal'
import { getStyledTemplate } from '../../../../templates/styled'

// Types
import { Platform } from '../../../../types/platform'
import { HookVariant, StructureVariant } from '../../../../types/structure'

interface IModalFilesParams {
  name: string
  path: string
  platform: Platform
  variant: StructureVariant
}

export async function createModalFiles(params: IModalFilesParams) {
  const { name, path, variant, platform } = params

  const componentPath = `${path}/index.tsx`
  const stylesPath = `${path}/styles.ts`
  const typesPath = `${path}/types.ts`

  const { component, types } = getModalTemplate(name, variant)
  const styledTemplate = getStyledTemplate(platform)

  try {
    await writeFile(componentPath, component, { encoding: 'utf-8' })
    await writeFile(typesPath, types, { encoding: 'utf-8' })
    await writeFile(stylesPath, styledTemplate, { encoding: 'utf-8' })

    if (variant === StructureVariant.HOOK) {
      const hookDirectory = `${path}/hooks`
      await createDirectory(hookDirectory)

      const createHookParams = {
        name,
        path: hookDirectory,
        variant: HookVariant.MODAL
      }

      await createHook(createHookParams)
    }
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

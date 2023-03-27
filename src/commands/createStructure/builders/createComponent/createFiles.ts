// External Libraries
import { window } from 'vscode'
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Builders
import { createHook } from '../createHook'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { parseError } from '../../../../utils/functions'
import { getStyledTemplate } from '../../../../templates/styled'
import { getComponentTemplate } from '../../../../templates/component'

// Types
import { Platform } from '../../../../types/platform'
import { HookVariant, StructureVariant } from '../../../../types/structure'

interface IComponentFilesParams {
  name: string
  path: string
  platform: Platform
  variant: StructureVariant
}

export async function createComponentFiles(params: IComponentFilesParams) {
  const { name, path, variant, platform } = params

  const componentPath = `${path}/index.tsx`
  const stylesPath = `${path}/styles.ts`

  const componentTemplate = getComponentTemplate(name, variant)
  const styledTemplate = getStyledTemplate(platform)

  try {
    await writeFile(componentPath, componentTemplate, { encoding: 'utf-8' })
    await writeFile(stylesPath, styledTemplate, { encoding: 'utf-8' })

    if (variant === StructureVariant.HOOK) {
      const hookDirectory = `${path}/hooks`
      await createDirectory(hookDirectory)

      const createHookParams = {
        name,
        path: hookDirectory,
        variant: HookVariant.DEFAULT
      }

      await createHook(createHookParams)
    }
  } catch (err) {
    window.showErrorMessage(parseError(err))
  }
}

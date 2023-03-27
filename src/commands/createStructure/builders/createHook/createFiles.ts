// External Libraries
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

// Utils
import { createDirectory } from '../../../../utils/fs'
import { getHookTemplate } from '../../../../templates/hook'
import { getExportedFilesTemplate } from '../../../../templates/export'
import { getHookModalTemplates } from '../../../../templates/modal/withHook'

// Types
import { HookVariant } from '../../../../types/structure'

export async function createHookFiles(
  name: string,
  path: string,
  variant: HookVariant
) {
  const typesDirectory = `${path}/types`

  if (!existsSync(typesDirectory)) await createDirectory(typesDirectory)

  if (variant === HookVariant.DEFAULT) {
    await createDefaultVariantFiles(path, name)
  } else await createModalVariantFiles(path, name)
}

async function createDefaultVariantFiles(path: string, name: string) {
  const functionPath = `${path}/index.ts`
  const indexPath = `${path}/types/index.ts`
  const typesPath = `${path}/types/${name}.ts`

  const { functionTemplate, types } = getHookTemplate(name)
  const indexTemplate = getExportedFilesTemplate([name])

  await writeFile(functionPath, functionTemplate, { encoding: 'utf-8' })
  await writeFile(typesPath, types, { encoding: 'utf-8' })
  await writeFile(indexPath, indexTemplate, { encoding: 'utf-8' })
}

async function createModalVariantFiles(path: string, name: string) {
  const functionPath = `${path}/index.ts`
  const indexPath = `${path}/types/index.ts`
  const typesPath = `${path}/types/${name}.ts`

  const { hook, hookTypes } = getHookModalTemplates(name)
  const indexTemplate = getExportedFilesTemplate([name])

  await writeFile(functionPath, hook, { encoding: 'utf-8' })
  await writeFile(typesPath, hookTypes, { encoding: 'utf-8' })
  await writeFile(indexPath, indexTemplate, { encoding: 'utf-8' })
}

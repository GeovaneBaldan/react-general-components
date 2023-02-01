import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getStyledWebTemplate } from '../../templates/styled'

export async function buildWebStyledFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/index.tsx`

  if (existsSync(targetPath)) {
    throw Error(`[Styled] ${componentName} already exists in this path.`)
  }

  try {
    const template = getStyledWebTemplate()
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

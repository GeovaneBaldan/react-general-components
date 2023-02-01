import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

import { getStyledMobileTemplate } from '../../../templates/styled'

export async function buildMobileStyledFile(
  componentName: string,
  targetDirectory: string
) {
  const targetPath = `${targetDirectory}/${componentName}/styles.ts`

  if (existsSync(targetPath)) {
    throw Error(`[Styled] ${componentName} already exists in this path.`)
  }

  try {
    const template = getStyledMobileTemplate()
    await writeFile(targetPath, template, { encoding: 'utf-8' })
  } catch (error) {
    throw error
  }
}

import { capitalize } from './capitalize'

const START_VALIDATION = /\buse\w*/i

export function formatHookName(name: string) {
  let hookName = name
  if (!START_VALIDATION.test(name)) hookName = `use${capitalize(name)}`

  const interfaceName = `I${capitalize(hookName)}`

  return { hookName: standardizeName(hookName), interfaceName }
}

function standardizeName(name: string) {
  return name.replace(/use/i, 'use')
}

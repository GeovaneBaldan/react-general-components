// Utils
import { capitalize } from './capitalize'

export function formatHookName(name: string) {
  let hookName = name

  const startWithUse = /\buse\w*/i.test(name)
  if (!startWithUse) hookName = `use${capitalize(name)}`

  return {
    hookName: standardizeName(hookName),
    interfaceName: `I${capitalize(hookName)}`
  }
}

function standardizeName(name: string) {
  return name.replace(/use/i, 'use')
}

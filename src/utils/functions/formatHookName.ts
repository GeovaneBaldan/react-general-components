// Utils
import { capitalize } from './capitalize'

// Types
import { HookVariant } from '../../types/variant'

export function formatHookName(name: string, variant?: HookVariant) {
  let hookName = name

  const startWithUse = /\buse\w*/i.test(name)
  if (!startWithUse) hookName = `use${capitalize(name)}`

  if (variant === HookVariant.MODAL) {
    hookName = hookName.replace(/modal$/i, '')
  }

  return {
    hookName: standardizeName(hookName),
    interfaceName: `${capitalize(hookName)}`
  }
}

function standardizeName(name: string) {
  return name.replace(/use/i, 'use')
}

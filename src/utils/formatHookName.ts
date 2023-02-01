import { capitalize } from './capitalize'

export function formatHookName(name: string) {
  let hookName = name
  if (!name.startsWith('use')) hookName = `use${capitalize(name)}`

  const interfaceName = `I${capitalize(hookName)}`

  return { hookName, interfaceName }
}

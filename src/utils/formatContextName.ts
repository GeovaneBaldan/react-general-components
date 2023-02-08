import { capitalize } from './capitalize'

export function formatContextName(name: string) {
  let contextName = name

  if (!name.startsWith('use')) contextName = `use${capitalize(name)}`

  const cleanName = capitalize(contextName.slice(3))
  const interfaceName = `I${cleanName}ContextData`

  return { contextName, cleanName, interfaceName }
}

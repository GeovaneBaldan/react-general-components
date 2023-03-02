import { capitalize } from './capitalize'

export function formatContextName(name: string) {
  const cleanName = cleanContextName(name)
  const interfaceName = `I${cleanName}ContextData`

  let contextName =
    name.match(/\buse\w*/i) === null ? `use${capitalize(name)}` : name

  contextName =
    contextName.match(/\b\w*context\b/i) === null
      ? `${contextName}Context`
      : contextName

  return { contextName: standardizeName(contextName), cleanName, interfaceName }
}

function cleanContextName(name: string) {
  const cleanName = name.replace(/use|context/gi, '')
  return capitalize(cleanName)
}

function standardizeName(name: string) {
  return name.replace(/use/i, 'use').replace(/context/i, 'Context')
}

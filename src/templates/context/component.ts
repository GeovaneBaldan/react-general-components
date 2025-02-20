// Utils
import { formatContextName } from '../../utils/functions'

// Types
import { ReactVersion } from '../../types/version'

export function getContextComponentTemplate(
  name: string,
  reactVersion: ReactVersion
) {
  const { contextName, cleanName, interfaceName } = formatContextName(name)

  return `// External Libraries
import React, { createContext, useContext, PropsWithChildren } from 'react'

// Types
import { ${interfaceName} } from './types'

const ${cleanName}Context = createContext<${interfaceName}>({} as ${interfaceName})

const ${cleanName}ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    ${getContextProvider(cleanName, reactVersion)}
  )
}

function ${contextName}(): ${interfaceName} {
  const context = useContext(${cleanName}Context)

  if (!Object.keys(context)?.length) {
    throw new Error('${contextName} must be within a ContextProvider')
  }

  return context
}

export { ${cleanName}ContextProvider, ${contextName} }
`
}

function getContextProvider(name: string, version: ReactVersion) {
  if (version === ReactVersion.V19) {
    return `<${name}Context value={{}}>
      {children}
    </${name}Context>`
  }

  return `<${name}Context.Provider value={{}}>
    {children}
  </${name}Context.Provider>
  `
}

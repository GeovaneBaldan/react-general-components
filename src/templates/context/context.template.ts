import { formatContextName } from '../../utils'

export function getContextTemplate(componentName: string) {
  const { contextName, cleanName, interfaceName } =
    formatContextName(componentName)

  return `// External Libraries
import React, { createContext, useContext } from 'react'

// Types
import { ${interfaceName} } from './types'

const ${cleanName}Context = createContext<${interfaceName}>({} as ${interfaceName})

const ${cleanName}ContextProvider: React.FC = ({ children }) => {

  return (
    <${cleanName}Context.Provider
      value={{ /* Values */ }}
    >
      {children}
    </${cleanName}Context.Provider>
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

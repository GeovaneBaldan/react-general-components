// Utils
import { formatHookName } from '../../utils/functions'

export function getHookComponentTemplate(name: string) {
  const { hookName } = formatHookName(name)

  return `// External Libraries
import React from 'react'

// Components

// Hooks
import { ${hookName} } from './hooks/${hookName}'

// Styles
import { Container } from './styles'

export const ${name}: React.FC = () => {
  // Hooks
  const {  } = ${hookName}()

  return <Container>{/* Code */}</Container>
}
`
}

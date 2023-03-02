import { formatHookName } from '../../utils'

export function getHookComponentTemplate(componentName: string) {
  const { hookName } = formatHookName(componentName)

  return `// External Libraries
import React from 'react'

// Components

// Hooks
import { ${hookName} } from './hooks/${hookName}'

// Styles
import { Container } from './styles'

export const ${componentName}: React.FC = () => {
  // Hooks
  const {  } = ${hookName}()

  return <Container>{/* Code */}</Container>
}
`
}

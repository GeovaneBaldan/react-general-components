export function getComponentTemplate(componentName: string) {
  return `// External Libraries
import React from 'react'

// Components

// Styles
import { Container } from './styles'

export const ${componentName}: React.FC = () => {
  return <Container>{/* Code */}</Container>
}
`
}

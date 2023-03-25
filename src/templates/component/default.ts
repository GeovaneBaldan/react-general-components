export function getDefaultComponentTemplate(name: string) {
  return `// External Libraries
import React from 'react'

// Components

// Styles
import { Container } from './styles'

export const ${name}: React.FC = () => {
  return <Container>{/* Code */}</Container>
}
`
}

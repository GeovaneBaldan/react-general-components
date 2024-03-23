export function getDefaultComponentTemplate(name: string) {
  return `// External Libraries
import React from 'react'

// Components

// Styles
import { Container } from './styles'

interface Props {
  // Props
}

export const ${name}: React.FC<Props> = ({/* Props */}) => {
  return <Container>{/* Code */}</Container>
}
`
}

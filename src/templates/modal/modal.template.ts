export function getModalTemplate(componentName: string) {
  return `
// External Libraries
import React, { useState, useImperativeHandle } from 'react'

// Components

// Types
import { ${componentName}Methods, ${componentName}Props } from './types'

// Styles
import { Container } from './styles'

export const ${componentName} = React.forwardRef<${componentName}Methods, ${componentName}Props>((props, ref) => {
  // Hooks
  useImperativeHandle(ref, handleRefMethods)

  // States
  const [visible, setVisible] = useState(false)

  // Functions
  function handleRefMethods() {
    return { open: handleOpen, close: handleClose }
  }

  function handleOpen() {
    setVisible(true)
  }

  function handleClose() {
    setVisible(false)
  }

  return <Container></Container>
})

${componentName}.displayName = '${componentName}'
`
}

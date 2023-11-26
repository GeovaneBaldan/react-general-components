// Utils
import { capitalize } from '../../../utils/functions'

export function getDefaultModalTemplate(componentName: string) {
  const modalName = capitalize(componentName)

  return `// External Libraries
import React, { useState, useImperativeHandle } from 'react'

// Components

// Hooks
import { useModalContext } from '@contexts/useModalContext'

// Types
import { ${modalName}Methods, ${modalName}Props } from './types'

// Styles
import { Container } from './styles'

export const ${modalName} = React.forwardRef<${modalName}Methods, ${modalName}Props>((props, ref) => {
  // Hooks
  useImperativeHandle(ref, handleRefMethods)
  const { closeModal } = useModalContext()

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
    closeModal()
  }

  return (
    <Modal open={visible} onClose={handleClose}>
      <Container></Container>
    </Modal>
  )
})

${modalName}.displayName = '${modalName}'

`
}

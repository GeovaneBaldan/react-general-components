// Utils
import { formatHookName } from '../../../utils/functions'

// Types
import { HookVariant } from '../../../types/structure'

export function getHookModalTemplate(componentName: string) {
  const { hookName } = formatHookName(componentName, HookVariant.MODAL)

  return `// External Libraries
import React, { useState, useImperativeHandle } from 'react'

// Components

// Hooks
import { ${hookName} } from './hooks/${hookName}'

// Types
import { ${componentName}Methods, ${componentName}Props } from './types'

// Styles
import { Container } from './styles'

export const ${componentName} = React.forwardRef<${componentName}Methods, ${componentName}Props>((props, ref) => {
  // Hooks
  const { visible, handleClose, handleRefMethods } = ${hookName}(props)
  useImperativeHandle(ref, handleRefMethods)

  return (
    <Modal>
      <Container></Container>
    </Modal>
  )
})

${componentName}.displayName = '${componentName}'
`
}

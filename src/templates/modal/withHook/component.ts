// Utils
import { capitalize, formatHookName } from '../../../utils/functions'

// Types
import { HookVariant } from '../../../types/structure'

export function getHookModalTemplate(componentName: string) {
  const modalName = capitalize(componentName)
  const { hookName } = formatHookName(componentName, HookVariant.MODAL)

  return `// External Libraries
import React, { useImperativeHandle } from 'react'

// Components

// Hooks
import { ${hookName} } from './hooks/${hookName}'

// Types
import { ${modalName}Props, ${modalName}Methods } from './types'

// Styles
import { Container } from './styles'

export const ${modalName} = React.forwardRef<${modalName}Methods, ${modalName}Props>((props, ref) => {
  // Hooks
  const { visible, handleClose, handleRefMethods } = ${hookName}(props)
  useImperativeHandle(ref, handleRefMethods)

  return (
    <Modal open={visible} onClose={handleClose}>
      <Container></Container>
    </Modal>
  )
})

${modalName}.displayName = '${modalName}'
`
}

// Utils
import { formatHookName } from '../../../utils/functions'

// Types
import { HookVariant } from '../../../types/structure'

export function getHookTemplate(componentName: string) {
  const { hookName, interfaceName } = formatHookName(
    componentName,
    HookVariant.MODAL
  )

  return `// External Libraries
import { useState } from 'react'

// Hooks
import { useModalContext } from '@contexts/useModalContext'

// Types
import { ${interfaceName}Params } from './types'

export function ${hookName}({}: ${interfaceName}Params) {
  // Hooks
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

  return { visible, handleClose, handleRefMethods }
}
`
}

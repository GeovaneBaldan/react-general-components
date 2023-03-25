// Utils
import { formatHookName } from '../../../utils/functions'

export function getHookTemplate(componentName: string) {
  const { hookName, interfaceName } = formatHookName(componentName)

  return `// External Libraries
import { useState } from 'react'

// Types
import { ${interfaceName}Params } from './types'

export function ${hookName}({}: ${interfaceName}Params) {
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

  return { visible, handleClose, handleRefMethods }
}
`
}

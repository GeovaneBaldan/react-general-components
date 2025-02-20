// Templates
import { getHookModalTemplates } from './withHook'
import { getDefaultModalTemplates } from './default'

// Types
import { StructureVariant } from '../../types/variant'

export function getModalTemplate(name: string, type: StructureVariant) {
  if (type === StructureVariant.DEFAULT) return getDefaultModalTemplates(name)
  else return getHookModalTemplates(name)
}

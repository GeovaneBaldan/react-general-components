// Templates
import { getHookComponentTemplate } from './hook'
import { getDefaultComponentTemplate } from './default'

// Types
import { StructureVariant } from '../../types/variant'

export function getComponentTemplate(name: string, type: StructureVariant) {
  if (type === StructureVariant.DEFAULT)
    return getDefaultComponentTemplate(name)
  else return getHookComponentTemplate(name)
}

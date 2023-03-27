// Templates
import { getHookComponentTemplate } from './hook'
import { getDefaultComponentTemplate } from './default'

// Types
import { StructureVariant } from '../../types/structure'

export function getComponentTemplate(name: string, type: StructureVariant) {
  if (type === StructureVariant.DEFAULT)
    return getDefaultComponentTemplate(name)
  else return getHookComponentTemplate(name)
}

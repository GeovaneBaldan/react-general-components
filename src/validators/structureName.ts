// External Libraries
import { isNil } from 'lodash'

export function isNameValid(name: string | undefined) {
  return !isNil(name) && name.trim() !== ''
}

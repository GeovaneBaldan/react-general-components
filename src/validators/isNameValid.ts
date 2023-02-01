import { isNil } from 'lodash'

export function isNameValid(name: string | undefined) {
  if (!name) return false

  return !(isNil(name) || name.trim() === '')
}

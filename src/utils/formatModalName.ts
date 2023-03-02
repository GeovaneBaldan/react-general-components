import { capitalize } from './capitalize'

const END_VALIDATION = /\b\w*modal\b/i

export function formatModalName(name: string) {
  let modalName = name

  if (!END_VALIDATION.test(name)) modalName = `${modalName}Modal`

  return capitalize(padronizeName(modalName))
}

function padronizeName(name: string) {
  return name.replace(/modal/i, 'Modal')
}

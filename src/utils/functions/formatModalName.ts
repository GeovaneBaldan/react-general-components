// Utils
import { capitalize } from './capitalize'

export function formatModalName(name: string) {
  let modalName = name

  const endsWithModal = /\b\w*modal\b/i.test(name)
  if (!endsWithModal) modalName = `${modalName}Modal`

  return capitalize(standardizeName(modalName))
}

function standardizeName(name: string) {
  return name.replace(/modal/i, 'Modal')
}

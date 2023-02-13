import { capitalize } from './capitalize'

export function formatModalName(name: string) {
  let modalName = name

  if (!name.toLowerCase().endsWith('modal')) modalName = `${modalName}Modal`

  return capitalize(modalName)
}

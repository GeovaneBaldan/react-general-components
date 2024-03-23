// External Libraries
import { mkdirp } from 'mkdirp'

export async function createDirectory(path: string) {
  await mkdirp(path)
}

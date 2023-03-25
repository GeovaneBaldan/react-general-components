// External Libraries
import mkdirp = require('mkdirp')

export async function createDirectory(path: string) {
  await mkdirp(path)
}

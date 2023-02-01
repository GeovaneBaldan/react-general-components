import mkdirp = require('mkdirp')

export async function createDirectory(targetDirectory: string): Promise<void> {
  await mkdirp(targetDirectory)
}

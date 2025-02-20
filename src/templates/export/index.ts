export function getExportedFilesTemplate(filenames: string[]) {
  return [...filenames]
    .sort((a, b) => a.length - b.length)
    .map(getFileName)
    .filter(name => name !== 'index' && !name.startsWith('.'))
    .map(name => `export * from './${name}'`)
    .join('\n')
}

const VALID_EXTENSIONS_REGEX = /\.(tsx|ts|jsx|js)$/

function getFileName(filename: string) {
  return filename.replace(VALID_EXTENSIONS_REGEX, '')
}

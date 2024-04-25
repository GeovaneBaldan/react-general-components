export function getExportedFilesTemplate(filenames: string[]) {
  let template = ''

  for (const filename of filenames) {
    const name = getFileName(filename)
    if (name === 'index' || name.startsWith('.')) continue
    template += `export * from './${name}'\n`
  }

  return template
}

function getFileName(filename: string) {
  const validExtensions = ['.tsx', '.ts', '.jsx', '.js']
  const extension = validExtensions.find(ext => filename.endsWith(ext))

  if (extension) return filename.slice(0, -extension.length)
  else return filename
}

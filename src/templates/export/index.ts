export function getExportedFilesTemplate(filenames: string[]) {
  let template = ''

  for (const filename of filenames) {
    const name = filename.split('.')[0]
    if (name === 'index') continue
    template += `export * from './${name}'\n`
  }

  return template
}

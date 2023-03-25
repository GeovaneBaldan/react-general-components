export function getExportedFilesTemplate(filenames: string[]) {
  let template = ''

  for (const filename of filenames) {
    const name = filename.split('.')[0]
    template += `export * from './${name}'\n`
  }

  return template
}

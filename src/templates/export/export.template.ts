export function buildExportTemplate(filenames: string[]) {
  let template = ''

  for (const filename of filenames) {
    template += `export * from './${filename}'\n`
  }

  return template
}

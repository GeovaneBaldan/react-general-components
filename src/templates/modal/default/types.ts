export function getDefaultModalTypesTemplate(componentName: string) {
  return `export interface ${componentName}Methods {
  open: () => void
  close: () => void
}

export interface ${componentName}Props {
  // Props
}
`
}

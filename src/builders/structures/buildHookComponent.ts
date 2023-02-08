import { ComponentTypes } from '../../constants/componentTypes'
import { buildHookFile, buildHookTypesFile } from '../files'
import { buildReactComponent } from './buildReactComponent'

export async function buildHookComponent(
  componentName: string,
  target: string,
  type: ComponentTypes
) {
  await buildReactComponent(componentName, target, type)

  const hookDirectory = `${target}/hooks`

  await buildHookFile(componentName, hookDirectory)
  await buildHookTypesFile(componentName, hookDirectory)
}

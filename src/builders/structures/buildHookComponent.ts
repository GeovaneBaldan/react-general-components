import { ComponentTypes } from '../../constants/componentTypes'
import { buildHook } from './buildHook'
import { buildReactComponent } from './buildReactComponent'

export async function buildHookComponent(
  componentName: string,
  target: string,
  type: ComponentTypes
) {
  await buildReactComponent(componentName, target, type)

  const hookDirectory = `${target}/hooks`

  await buildHook(componentName, hookDirectory)
}

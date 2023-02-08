import { buildHook } from './buildHook'
import { ComponentTypes } from '../../constants/componentTypes'
import { buildReactComponent } from './buildReactComponent'

export async function buildHookComponent(
  componentName: string,
  target: string,
  type: ComponentTypes
) {
  await buildReactComponent(componentName, target, type)

  const hookDirectory = `${target}/${componentName}/hooks`

  await buildHook(componentName, hookDirectory)
}

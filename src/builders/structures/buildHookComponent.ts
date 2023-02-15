import { buildHook } from './buildHook'
import { ComponentTypes } from '../../constants/componentTypes'
import { buildReactHookComponent } from './buildReactHookComponent'

export async function buildHookComponent(
  componentName: string,
  target: string,
  type: ComponentTypes
) {
  await buildReactHookComponent(componentName, target, type)

  const hookDirectory = `${target}/${componentName}/hooks`

  await buildHook(componentName, hookDirectory)
}

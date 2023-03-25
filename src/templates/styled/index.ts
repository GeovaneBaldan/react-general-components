// Templates
import { WEB_STYLED_TEMPLATE } from './web'
import { MOBILE_STYLED_TEMPLATE } from './mobile'

// Types
import { Platform } from '../../types/platform'

export function getStyledTemplate(platform: Platform) {
  if (platform === Platform.MOBILE) return MOBILE_STYLED_TEMPLATE
  else return WEB_STYLED_TEMPLATE
}

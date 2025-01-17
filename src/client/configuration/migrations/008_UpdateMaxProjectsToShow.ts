import { Migrate } from './index'
import get from 'lodash/get'
import has from 'lodash/has'
import set from 'lodash/set'
import { MaxProjectsToShow, settingsRoot } from '../../settings/SettingsReducer'

export const id = '008_UpdateMaxProjectsToShow'

export const migrate: Migrate = (data) => {
  if (has(data, [settingsRoot, 'maxProjectsToShow'])) {
    const oldValue = get(data, [settingsRoot, 'maxProjectsToShow']) as number
    let newValue
    if (oldValue < 12) {
      newValue = MaxProjectsToShow.small
    } else if (oldValue === 12) {
      newValue = MaxProjectsToShow.medium
    } else if (oldValue > 12 && oldValue < Number.MAX_SAFE_INTEGER) {
      newValue = MaxProjectsToShow.large
    } else {
      newValue = MaxProjectsToShow.all
    }
    set(data, [settingsRoot, 'maxProjectsToShow'], newValue)
  }
}

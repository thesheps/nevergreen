import React from 'react'
import {render} from '../../testHelpers'
import userEvent from '@testing-library/user-event'
import {
  getClickToShowMenu,
  getShowBuildLabel,
  getShowBuildTime,
  getShowTrayName,
  SETTINGS_ROOT
} from '../SettingsReducer'
import {screen} from '@testing-library/react'
import {DisplaySettings} from './DisplaySettings'

it('should set the click to show menu setting', () => {
  const state = {
    [SETTINGS_ROOT]: {
      clickToShowMenu: false
    }
  }

  const {store} = render(<DisplaySettings/>, {state})
  userEvent.click(screen.getByLabelText('Click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})

it('should set the show feed identifier setting', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showTrayName: false
    }
  }

  const {store} = render(<DisplaySettings/>, {state})
  userEvent.click(screen.getByLabelText('Show feed identifier'))

  expect(getShowTrayName(store.getState())).toBeTruthy()
})

it('should set the show build time setting', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showBuildTime: false
    }
  }

  const {store} = render(<DisplaySettings/>, {state})
  userEvent.click(screen.getByLabelText('Show build time'))

  expect(getShowBuildTime(store.getState())).toBeTruthy()
})

it('should set the show build label setting', () => {
  const state = {
    [SETTINGS_ROOT]: {
      showBuildLabel: false
    }
  }

  const {store} = render(<DisplaySettings/>, {state})
  userEvent.click(screen.getByLabelText('Show build label'))

  expect(getShowBuildLabel(store.getState())).toBeTruthy()
})
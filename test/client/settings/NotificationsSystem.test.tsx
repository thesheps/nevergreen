import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitForDomChange} from '@testing-library/react'
import {
  NOT_SUPPORTED_MESSAGE,
  NOTIFICATIONS_ENABLED_NOTIFICATION,
  NotificationsSystem,
  PERMISSION_DENIED_MESSAGE
} from '../../../src/client/settings/NotificationsSystem'
import {render} from '../testHelpers'
import {getShowSystemNotifications, SETTINGS_ROOT} from '../../../src/client/settings/SettingsReducer'
import * as SystemNotifications from '../../../src/client/common/SystemNotifications'

describe('<NotificationsSystem/>', () => {

  beforeEach(() => {
    jest.spyOn(SystemNotifications, 'requestPermission').mockResolvedValue('')
    jest.spyOn(SystemNotifications, 'sendSystemNotification').mockResolvedValue()
  })

  test('should allow system notifications to be enabled', async () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(true)
    const state = {
      [SETTINGS_ROOT]: {
        showSystemNotifications: false
      }
    }
    const {store, getByLabelText} = render(<NotificationsSystem/>, state)
    userEvent.click(getByLabelText('show system notifications'))

    expect(getByLabelText('show system notifications')).toHaveAttribute('disabled')

    await waitForDomChange()

    expect(getShowSystemNotifications(store.getState())).toBeTruthy()
    expect(getByLabelText('show system notifications')).not.toHaveAttribute('disabled')
    expect(SystemNotifications.sendSystemNotification).toHaveBeenCalledWith(NOTIFICATIONS_ENABLED_NOTIFICATION)
  })

  test('should not show the not supported message if browser notifications are supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    const {queryByText} = render(<NotificationsSystem/>)
    expect(queryByText('Unfortunately your browser doesn\'t support notifications.')).not.toBeInTheDocument()
  })

  test('should show the not supported message if browser notifications are not supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
    const {queryByText} = render(<NotificationsSystem/>)
    expect(queryByText(NOT_SUPPORTED_MESSAGE)).toBeInTheDocument()
  })

  test('should not give the option to show browser notifications if they are not supported', () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(false)
    const {queryByLabelText} = render(<NotificationsSystem/>)
    expect(queryByLabelText('show system notifications')).not.toBeInTheDocument()
  })

  test('should show a message if notifications are supported but permission is denied', async () => {
    jest.spyOn(SystemNotifications, 'supported').mockReturnValue(true)
    jest.spyOn(SystemNotifications, 'permissionGranted').mockReturnValue(false)

    const {queryByText, getByLabelText} = render(<NotificationsSystem/>)
    userEvent.click(getByLabelText('show system notifications'))

    await waitForDomChange()

    expect(queryByText(PERMISSION_DENIED_MESSAGE)).toBeInTheDocument()
  })
})

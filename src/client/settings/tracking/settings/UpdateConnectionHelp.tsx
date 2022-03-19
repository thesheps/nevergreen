import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../../help/HelpForms'
import {routeTrackingDetailsConnection} from '../../../AppRoutes'

const KEYWORDS = [
  'tracking',
  'settings',
  'url',
  'server type',
  'username',
  'password',
  'access token',
  'auth'
]

export function UpdateConnectionHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={KEYWORDS}
      searchQuery={searchQuery}
      title='Update connection'
      page={routeTrackingDetailsConnection}>
      <HelpForm>
        <HelpInput name='URL'>
          The URL of the CCTray XML feed.
        </HelpInput>
        <HelpInput name='Authentication'>
          Since credentials are stored encrypted they can not be pre-populated, the <em>Keep existing auth</em> option
          makes it possible to update the URL without being forced to re-enter the auth details.
        </HelpInput>
        <HelpInput name='Check connection'>
          This will check the currently entered details and display a message whether the connection was successful
          or not.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
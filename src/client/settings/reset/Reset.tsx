import React, {ReactElement, useState} from 'react'
import styles from './reset.scss'
import {clear} from '../../configuration/LocalRepository'
import {DangerButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'
import {Page} from '../../common/Page'
import {WarningMessages} from '../../common/Messages'

export function Reset(): ReactElement {
  const [resetting, setResetting] = useState(false)

  const resetConfiguration = async () => {
    setResetting(true)
    await clear()
    window.location.reload()
  }

  return (
    <Page title='Reset configuration'>
      <p>Reset your Nevergreen configuration back to defaults.</p>
      <WarningMessages messages={[
        'Please note, resetting your configuration can not be undone!',
        'It\'s recommended to make a backup before resetting.'
      ]}/>
      <DangerButton className={styles.reset}
                    onClick={resetConfiguration}
                    disabled={resetting}
                    icon={iBin}>
        Reset configuration
      </DangerButton>
    </Page>
  )
}

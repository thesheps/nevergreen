import React from 'react'
import {isBlank} from './common/Utils'
import cn from 'classnames'
import styles from './notification.scss'
import {PrimaryButton} from './common/forms/Button'
import {iCross} from './common/fonts/Icons'

interface NotificationProps {
  readonly notification: string;
  readonly dismiss: () => void;
  readonly fullScreen: boolean;
}

export function Notification({notification, dismiss, fullScreen}: NotificationProps) {
  if (isBlank(notification)) {
    return null
  }

  const notificationClassNames = cn(styles.popUpNotification, {
    [styles.fullscreen]: fullScreen
  })

  return (
    <section className={notificationClassNames}
             aria-live='polite'
             role='complementary'>
      <div className={styles.message}>
        {notification}
      </div>
      <PrimaryButton icon={iCross}
                     iconOnly
                     className={styles.dismiss}
                     onClick={dismiss}>
        dismiss
      </PrimaryButton>
    </section>
  )
}
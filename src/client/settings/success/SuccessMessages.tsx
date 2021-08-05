import React, {ReactElement, ReactNode} from 'react'
import {RemoveButton} from './RemoveButton'
import {isValidHttpUrl} from '../../domain/Url'
import {SuccessMessage} from '../../common/SuccessMessage'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {removeMessage} from './SuccessActionCreators'
import styles from './success-messages.scss'
import {AddButton} from '../../common/LinkButton'
import {ROUTE_SUCCESS_ADD} from '../../Routes'
import {WarningMessages} from '../../common/Messages'
import {notEmpty} from '../../common/Utils'
import {Page} from '../../common/Page'

export const NO_MESSAGES_WARNING = 'No success messages added, a blank screen will be shown on the Monitor page when no interesting projects are displayed'

function AspectRatio({children}: { children: ReactNode }): ReactElement {
  return (
    <li className={styles.messageItem}>
      <div className={styles.messageWrapper}>
        {children}
      </div>
    </li>
  )
}

export function SuccessMessages(): ReactElement {
  const dispatch = useDispatch()
  const messages = useSelector(getSuccessMessages)

  const noMessagesWarning = notEmpty(messages)
    ? ''
    : NO_MESSAGES_WARNING

  return (
    <Page title='Success messages'>
      <AddButton to={ROUTE_SUCCESS_ADD}>Add message</AddButton>
      <WarningMessages messages={noMessagesWarning}/>
      <ol className={styles.messages}
          id='success'>
        {
          messages.map((msg) => {
            return (
              <AspectRatio key={msg}>
                {isValidHttpUrl(msg) ? (
                  <img className={styles.message}
                       src={msg}
                       alt={msg}
                       title={msg}
                       data-locator='success-image'/>
                ) : (
                  <div className={styles.message}>
                    <SuccessMessage message={msg}/>
                  </div>
                )}
                <RemoveButton removeMessage={() => dispatch(removeMessage(msg))}/>
              </AspectRatio>
            )
          })
        }
      </ol>
    </Page>
  )
}

import type { Feed } from './FeedsReducer'
import { AuthTypes } from './FeedsReducer'
import { createAction } from '@reduxjs/toolkit'

export interface FeedAddedAction {
  readonly trayId: string
  readonly url: string
  readonly authType: AuthTypes
  readonly username?: string
  readonly encryptedPassword?: string
  readonly encryptedAccessToken?: string
}

interface FeedUpdatedAction {
  readonly trayId: string
  readonly feed: Partial<Feed>
}

export const feedAdded = createAction<FeedAddedAction>('tracking/feedAdded')
export const feedUpdated = createAction<FeedUpdatedAction>(
  'tracking/feedUpdated'
)
export const feedRemoved = createAction<string>('tracking/feedRemoved')

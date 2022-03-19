import React, {ReactElement} from 'react'
import {useSelector} from 'react-redux'
import {getBackupLocation, RemoteLocation} from './RemoteLocationsReducer'
import {Outlet, useOutletContext, useParams} from 'react-router-dom'
import {Navigate} from 'react-router'
import {routeBackup} from '../../AppRoutes'

export function RemoteLocationPage(): ReactElement {
  const {internalId} = useParams()
  const location = useSelector(getBackupLocation(internalId || ''))

  if (location) {
    return <Outlet context={location}/>
  } else {
    return <Navigate to={routeBackup}/>
  }
}

export function useRemoteLocationContext(): RemoteLocation {
  return useOutletContext()
}
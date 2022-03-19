import {getProjectsForFeed, PROJECTS_ROOT, ProjectsState, reduce} from './ProjectsReducer'
import {Actions} from '../../Actions'
import {projectsFetched, feedAdded, feedRemoved} from './TrackingActionCreators'
import {buildProject, buildSavedProject, buildState, testReducer} from '../../testHelpers'
import {RecursivePartial} from '../../common/Types'
import {AuthTypes} from '../../domain/Feed'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [PROJECTS_ROOT]: reduce
})

function state(existing?: RecursivePartial<ProjectsState>) {
  return buildState({[PROJECTS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should overwrite any existing data with the action data', () => {
    const newProject = buildProject({projectId: 'projectId'})
    const existingState = state({
      oldTrayId: [buildProject({projectId: 'oldProjectId'})]
    })
    const action = configurationImported({[PROJECTS_ROOT]: {trayId: [newProject]}})

    const newState = reducer(existingState, action)

    expect(getProjectsForFeed('oldTrayId')(newState)).toBeUndefined()
    expect(getProjectsForFeed('trayId')(newState)).toEqual([newProject])
  })

  it('should handle no projects data', () => {
    const project = buildProject({projectId: 'projectId'})
    const existingState = state({trayId: [project]})
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getProjectsForFeed('trayId')(newState)).toEqual([project])
  })
})

describe(Actions.FEED_ADDED, () => {

  it('should add a tray id property', () => {
    const existingState = state({})
    const action = feedAdded('trayId', '', AuthTypes.none, '', '', '')
    const newState = reducer(existingState, action)
    expect(getProjectsForFeed('trayId')(newState)).toEqual([])
  })
})

describe(Actions.FEED_REMOVED, () => {

  it('should delete the tray id property', () => {
    const existingState = state({trayId: [buildProject()]})
    const action = feedRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getProjectsForFeed('trayId')(newState)).toBeUndefined()
  })
})

describe(Actions.PROJECTS_FETCHED, () => {

  it('should delete projects not fetched that were previously marked as removed', () => {
    const existingState = state({
      trayId: [
        buildSavedProject({projectId: 'projectId1', removed: true}),
        buildSavedProject({projectId: 'projectId2', removed: true}),
        buildSavedProject({projectId: 'projectId3', removed: true})
      ]
    })
    const action = projectsFetched('trayId', [], false)

    const newState = reducer(existingState, action)

    expect(getProjectsForFeed('trayId')(newState)).toEqual([])
  })

  it('should mark existing projects as removed if they haven\'t been fetched again', () => {
    const existingState = state({
      trayId: [
        buildSavedProject({projectId: 'projectId', removed: false})
      ]
    })
    const action = projectsFetched('trayId', [], false)

    const newState = reducer(existingState, action)

    expect(getProjectsForFeed('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId', removed: true})
    ])
  })

  it('should mark all existing projects as not new', () => {
    const existingState = state({
      trayId: [
        buildSavedProject({projectId: 'projectId', isNew: true})
      ]
    })
    const action = projectsFetched('trayId', [], false)

    const newState = reducer(existingState, action)

    expect(getProjectsForFeed('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId', isNew: false})
    ])
  })

  it('should mark existing projects that have been fetched again as not removed', () => {
    const existingState = state({
      trayId: [
        buildSavedProject({projectId: 'projectId'})
      ]
    })
    const action = projectsFetched(
      'trayId',
      [
        buildProject({projectId: 'projectId'})
      ],
      false)

    const newState = reducer(existingState, action)

    expect(getProjectsForFeed('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId', removed: false})
    ])
  })

  it('should correctly store existing and newly fetched projects', () => {
    const existingState = state({
      trayId: [
        buildSavedProject({projectId: 'projectId1', description: '1', trayId: 'trayId'})
      ]
    })
    const action = projectsFetched(
      'trayId',
      [
        buildProject({projectId: 'projectId2', description: '2', trayId: 'trayId'})
      ],
      false)

    const newState = reducer(existingState, action)

    expect(getProjectsForFeed('trayId')(newState)).toEqual([
      {projectId: 'projectId2', description: '2', isNew: true, removed: false, trayId: 'trayId'},
      {projectId: 'projectId1', description: '1', isNew: false, removed: true, trayId: 'trayId'}
    ])
  })
})
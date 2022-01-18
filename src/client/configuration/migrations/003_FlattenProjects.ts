import {forEachObjectAt} from '../Migrate'
import {Migrate} from './index'
import {PROJECTS_ROOT} from '../../settings/tracking/ProjectsReducer'
import set from 'lodash/set'

export const id = '003_FlattenProjects.ts'

export const migrate: Migrate = (data) => {
  forEachObjectAt(data, PROJECTS_ROOT, (projects, trayId) => {
    set(data, [PROJECTS_ROOT, trayId], Object.values(projects))
  })
}

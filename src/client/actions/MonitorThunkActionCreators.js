import {interesting} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/NevergreenGateway'
import _ from 'lodash'
import {isBuilding} from '../domain/Project'
import {extract} from '../domain/Tray'
import {interestingProjects} from './MonitorActionCreators'

function toErrorString(trays, project) {
  const tray = _.head(trays.filter((tray) => tray.trayId === project.trayId))
  const identifier = _.get(tray, 'name') || _.get(tray, 'url')
  return `${identifier} ${project.errorMessage}`
}

function byProjectId(existing, newProject) {
  return existing.projectId === newProject.projectId
}

function wasBuildingPreviousFetch(existingProject) {
  return !_.isNil(existingProject) && existingProject.thisBuildTime
}

function addThisBuildTime(project, currentProjects) {
  const existingProject = currentProjects.find((existing) => byProjectId(existing, project))

  if (isBuilding(project.prognosis)) {
    project.thisBuildTime = wasBuildingPreviousFetch(existingProject)
      ? existingProject.thisBuildTime
      : project.fetchedTime
  } else {
    project.thisBuildTime = null
  }

  return project
}

export function fetchInteresting(trays, selected, currentProjects) {
  return function (dispatch) {
    return send(interesting(trays, selected)).then((allProjects) => {
      const {okProjects, errorProjects} = extract(allProjects)
      const enrichedProjects = okProjects.map((project) => addThisBuildTime(project, currentProjects))
      const errorMessages = errorProjects.map((project) => toErrorString(trays, project))

      return dispatch(interestingProjects(enrichedProjects, errorMessages))
    }).catch((error) => {
      return dispatch(interestingProjects([], [error.message]))
    })
  }
}
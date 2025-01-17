import React, { ReactElement, useCallback, useState } from 'react'
import difference from 'lodash/difference'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import take from 'lodash/take'
import { ScaledGrid } from './ScaledGrid'
import { projectIdentifier, Projects } from '../domain/Project'
import { TileProject } from './TileProject'
import { TileProjectsNotShown } from './TileProjectsNotShown'
import styles from './interesting-projects.scss'
import { useSelector } from 'react-redux'
import {
  getMaxProjectsToShow,
  getShowPrognosis,
  MaxProjectsToShow,
} from '../settings/SettingsReducer'
import { isMobile, isTablet } from '../common/Style'
import { useWindowResized } from '../common/ResizableHook'
import { FeedErrors, isError } from '../domain/FeedError'

interface InterestingProjectsProps {
  readonly projects: Projects
  readonly feedErrors: FeedErrors
}

const mobileProjectsToShow: Record<MaxProjectsToShow, number> = {
  [MaxProjectsToShow.small]: 3,
  [MaxProjectsToShow.medium]: 5,
  [MaxProjectsToShow.large]: 9,
  [MaxProjectsToShow.all]: Number.MAX_SAFE_INTEGER,
}

// tablet uses 2 columns, so these numbers should be (n * 2) - 1
const tabletProjectsToShow: Record<MaxProjectsToShow, number> = {
  [MaxProjectsToShow.small]: 5,
  [MaxProjectsToShow.medium]: 9,
  [MaxProjectsToShow.large]: 15,
  [MaxProjectsToShow.all]: Number.MAX_SAFE_INTEGER,
}

// desktop uses 3 columns, so these numbers should be (n * 3) - 1
const desktopProjectsToShow: Record<MaxProjectsToShow, number> = {
  [MaxProjectsToShow.small]: 8,
  [MaxProjectsToShow.medium]: 11,
  [MaxProjectsToShow.large]: 23,
  [MaxProjectsToShow.all]: Number.MAX_SAFE_INTEGER,
}

function calculateProjectsToShow(maxProjectsToShow: MaxProjectsToShow) {
  if (isMobile()) {
    return get(mobileProjectsToShow, maxProjectsToShow)
  } else if (isTablet()) {
    return get(tabletProjectsToShow, maxProjectsToShow)
  }
  return get(desktopProjectsToShow, maxProjectsToShow)
}

export function InterestingProjects({
  projects,
  feedErrors,
}: InterestingProjectsProps): ReactElement {
  const maxProjectsToShow = useSelector(getMaxProjectsToShow)
  const prognosisToShow = useSelector(getShowPrognosis)
  const [actualMaxProjectsToShow, setActualMaxProjectsToShow] = useState(
    calculateProjectsToShow(maxProjectsToShow)
  )

  const onWindowResize = useCallback(() => {
    setActualMaxProjectsToShow(calculateProjectsToShow(maxProjectsToShow))
  }, [maxProjectsToShow])

  useWindowResized(onWindowResize)

  const filteredProjects = [...feedErrors, ...projects].filter(
    (project) => isError(project) || prognosisToShow.includes(project.prognosis)
  )

  const showSummary = filteredProjects.length > actualMaxProjectsToShow

  const projectsToShow = showSummary
    ? take(filteredProjects, actualMaxProjectsToShow)
    : filteredProjects

  const projectsNotShown = difference(filteredProjects, projectsToShow)

  const projectComponents = projectsToShow.map((project) => {
    return (
      <TileProject
        key={projectIdentifier(project)}
        project={project}
        visibleProjects={projectsToShow}
      />
    )
  })

  const summary = !isEmpty(projectsNotShown) && (
    <TileProjectsNotShown key="summary" projectsNotShown={projectsNotShown} />
  )

  return (
    <div
      className={styles.interestingProjects}
      data-locator="interesting-projects"
      aria-live="assertive"
      aria-relevant="all"
    >
      <ScaledGrid>
        {projectComponents}
        {summary}
      </ScaledGrid>
    </div>
  )
}

import React, { ReactElement } from 'react'
import { ExternalLink } from '../../common/ExternalLink'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { URL } from '../../common/URL'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { ROUTE_BACKUP_ADD } from '../../AppRoutes'

const keywords = ['backup', 'export', 'import', 'where', 'url']

export function AddBackupHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Add remote location"
      page={ROUTE_BACKUP_ADD}
    >
      <HelpForm>
        <HelpInput name="Where">
          The remote location type. Additional fields will be required depending
          on where you are adding.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}

export function RemoteBackupCustomHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={[...keywords, 'custom server']}
      searchQuery={searchQuery}
      title="Add remote location - Custom server"
      page={ROUTE_BACKUP_ADD}
    >
      <HelpForm>
        <HelpInput name="URL">
          The configuration <code>JSON</code> will be <code>POSTed</code> to
          this <strong>URL</strong>. Tip, if you need to support multiple
          exports with the same custom server, you can make it RESTful and
          specify the ID directly.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}

export function RemoteBackupGitHubHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={[...keywords, 'access token', 'github', 'gist']}
      searchQuery={searchQuery}
      title="Add remote location - GitHub gist"
      page={ROUTE_BACKUP_ADD}
    >
      <HelpForm>
        <HelpInput name="URL">
          This will be pre-populated with the public GitHub API URL and can be
          edited to allow exporting to a GitHub Enterprise instance.
        </HelpInput>
        <HelpInput name="ID">
          Add a gist <strong>ID</strong> to update an existing gist or leave
          blank to create a new gist. You can get a gist ID from the gist URL,{' '}
          <URL url="https://gist.github.com/:username/:gistId" />. New gists
          will be created as secret gists, but please note{' '}
          <ExternalLink href="https://docs.github.com/en/github/writing-on-github/editing-and-sharing-content-with-gists/creating-gists">
            secret gists are not actually private
          </ExternalLink>
          .
        </HelpInput>
        <HelpInput name="Access token">
          You need to{' '}
          <ExternalLink href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token">
            generate a personal <strong>Access token</strong>
          </ExternalLink>{' '}
          to allow a gist to be created. The token <em>only</em> requires the{' '}
          <ExternalLink href="https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps">
            <code>gist</code> scope
          </ExternalLink>
          .
        </HelpInput>
        <HelpInput name="Description">
          A description that will display in GitHub.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}

export function RemoteBackupGitLabHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={[...keywords, 'access token', 'gitlab', 'snippet']}
      searchQuery={searchQuery}
      title="Add remote location - GitLab snippet"
      page={ROUTE_BACKUP_ADD}
    >
      <HelpForm>
        <HelpInput name="URL">
          This will be pre-populated with the public GitLab URL and can be
          edited to allow exporting to a private instance.
        </HelpInput>
        <HelpInput name="ID">
          Add a snippet <strong>ID</strong> to update an existing Snippet or
          leave blank to create a new Snippet. You can get a Snippet ID from the
          Snippet URL, <URL url="https://gitlab.com/snippets/:snippetId" />.
        </HelpInput>
        <HelpInput name="Access token">
          You need to{' '}
          <ExternalLink href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html">
            generate a personal <strong>Access token</strong>
          </ExternalLink>{' '}
          to allow a Snippet to be created. The token requires the{' '}
          <ExternalLink href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#limiting-scopes-of-a-personal-access-token">
            <code>api</code> scope
          </ExternalLink>
          . Please note, the <code>api</code> scope gives full access, once{' '}
          <ExternalLink href="https://gitlab.com/gitlab-org/gitlab/-/issues/20440">
            GitLab make scopes more fine grained
          </ExternalLink>{' '}
          Nevergreen will use that.
        </HelpInput>
        <HelpInput name="Description">
          A description that will display in GitLab.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}

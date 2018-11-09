import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce, TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {
  ENCRYPTING_PASSWORD,
  HIGHLIGHT_TRAY,
  IMPORT_SUCCESS,
  INITIALISED,
  NAVIGATED,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SET_SERVER_TYPE,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, List, Map} from 'immutable'
import {Tray} from '../../../src/client/domain/Tray'

describe('TraysReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISED, function () {

    it('should set the trays data', function () {
      const existingState = Map({someId: {}})
      const action = {type: INITIALISED, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Tray)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Map()
      const action = {type: INITIALISED, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should handle no trays data', function () {
      const existingState = Map()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.be.empty()
    })
  })

  describe(IMPORT_SUCCESS, function () {

    it('should set the trays data', function () {
      const existingState = Map({someId: {}})
      const action = {type: IMPORT_SUCCESS, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Tray)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Map()
      const action = {type: IMPORT_SUCCESS, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })
  })

  describe(TRAY_ADDED, function () {

    it('should set the tray data', function () {
      const existingState = Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId', data: fromJS({foo: 'bar'})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('foo', 'bar')
    })
  })

  describe(HIGHLIGHT_TRAY, function () {

    it('should set the highlight flag to true', function () {
      const existingState = fromJS({trayId: new Tray({highlight: false})})
      const action = {type: HIGHLIGHT_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', true)
    })
  })

  describe(NAVIGATED, function () {

    it('should set the highlight flag to false for all trays', function () {
      const existingState = fromJS({trayId: new Tray({highlight: true})})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', false)
    })
  })

  describe(REMOVE_TRAY, function () {

    it('should set the tray data', function () {
      const existingState = Map({trayId: new Tray()})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
    })
  })

  describe(ENCRYPTING_PASSWORD, function () {

    it('should set as not loaded', function () {
      const existingState = fromJS({trayId: {loaded: true}})
      const action = {type: ENCRYPTING_PASSWORD, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', false)
    })
  })

  describe(PROJECTS_FETCHING, function () {

    it('should set as not loaded', function () {
      const existingState = fromJS({trayId: new Tray({loaded: true})})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', false)
    })

    it('should remove any errors', function () {
      const existingState = fromJS({trayId: new Tray({errors: 'some-error'})})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors', null)
    })

    it('should unset requires refresh', function () {
      const existingState = fromJS({trayId: new Tray({requiresRefresh: true})})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('requiresRefresh', false)
    })
  })

  describe(PASSWORD_ENCRYPTED, function () {

    it('should set the password', function () {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('password', 'some-password')
    })

    it('should set loaded', function () {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should remove any errors', function () {
      const existingState = Map({trayId: new Tray({errors: List.of('some-error')})})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors', null)
    })

    it('should set requires refresh', function () {
      const existingState = Map({trayId: new Tray({requiresRefresh: false})})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('requiresRefresh', true)
    })
  })

  describe(PROJECTS_FETCHED, function () {

    it('should set loaded', function () {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set timestamp', function () {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', timestamp: 'some-timestamp'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('timestamp', 'some-timestamp')
    })

    it('should set server type', function () {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', serverType: 'some-type'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('serverType', 'some-type')
    })

    it('should remove any errors', function () {
      const existingState = Map({trayId: new Tray({errors: List.of('some-error')})})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })
  })

  describe(PASSWORD_ENCRYPT_ERROR, function () {

    it('should set loaded', function () {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set errors', function () {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId', errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors').that.contains('some-error')
    })
  })

  describe(PROJECTS_FETCH_ERROR, function () {

    it('should set loaded', function () {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set errors', function () {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId', errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors').that.contains('some-error')
    })
  })

  describe(SET_TRAY_NAME, function () {

    it('should set the name', function () {
      const existingState = Map({trayId: new Tray({name: 'some-name'})})
      const action = {type: SET_TRAY_NAME, trayId: 'trayId', name: 'some-new-name'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('name', 'some-new-name')
    })
  })

  describe(SET_SERVER_TYPE, function () {

    it('should set the server type', function () {
      const existingState = Map({trayId: new Tray({serverType: 'some-type'})})
      const action = {type: SET_SERVER_TYPE, trayId: 'trayId', serverType: 'some-new-type'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('serverType', 'some-new-type')
    })
  })

  describe(SET_TRAY_USERNAME, function () {

    it('should set the username if its different', function () {
      const existingState = Map({trayId: new Tray({username: 'some-username'})})
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-new-username'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('username', 'some-new-username')
    })

    it('should set requires refresh if the username is different', function () {
      const existingState = Map({
        trayId: new Tray({
          trayId: 'trayId',
          username: 'some-username',
          requiresRefresh: false
        })
      })
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-new-username'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('requiresRefresh', true)
    })

    it('should not set requires refresh if the username is the same', function () {
      const existingState = Map({
        trayId: new Tray({
          trayId: 'trayId',
          username: 'some-username',
          requiresRefresh: false
        })
      })
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-username'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('requiresRefresh', false)
    })
  })

  describe(SET_TRAY_URL, function () {

    it('should set the url if its different', function () {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', url: 'some-url'})})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('url', 'some-new-url')
    })

    it('should set requires refresh if the URL is different', function () {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('requiresRefresh', true)
    })

    it('should not set requires refresh if the URL is the same', function () {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('requiresRefresh', false)
    })
  })
})

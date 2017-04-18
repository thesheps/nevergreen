import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {encryptPassword, refreshTray, removeTray, setServerType, setTrayName, setTrayUsername} from '../../actions/TrackingActions'
import TraySettings from './TraySettings'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeTray, setTrayName, setServerType, setTrayUsername, encryptPassword, refreshTray}, dispatch)
}

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  return Immutable.Map().merge(tray, ownProps).toJS()
}

export default connect(mapStateToProps, mapDispatchToProps)(TraySettings)

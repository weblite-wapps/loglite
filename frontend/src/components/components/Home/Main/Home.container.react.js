// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational.react'
// actions
import { changeTab } from '../../../Main/App.action'


const mapStateToProps = state => ({
  logs: state.App.logs,
})

const mapDispatchToProps = dispatch => ({
  changeTab: value => dispatch(changeTab(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

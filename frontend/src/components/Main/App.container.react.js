// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// actions
import { changeTab, fetchTodayData } from './App.action'


const mapStateToProps = state => ({
  isLoading: state.App.isLoading,
  tabIndex: state.App.tabIndex,
})

const mapDispatchToProps = dispatch => ({
  changeTab: value => dispatch(changeTab(value)),
  fetchTodayData: () => dispatch(fetchTodayData()),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)

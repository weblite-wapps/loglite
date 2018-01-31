// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// actions
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData } from './App.action'


const mapStateToProps = state => ({
  isLoading: state.App.isLoading,
  tabIndex: state.App.tabIndex,
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
})


export default connect(mapStateToProps, mapDispatchToProps)(App)

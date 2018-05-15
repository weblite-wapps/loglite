// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational'
// views
import { isLoadingView, tabIndexView, aboutModeView } from './App.reducer'
// actions
import { dispatchCheckToSetSecondsElapsed } from '../components/Home/Main/Home.action'
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData, dispatchSetAboutMode } from './App.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  tabIndex: tabIndexView(),
  aboutMode: aboutModeView(),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
  checkToSetSecondsElapsed: dispatchCheckToSetSecondsElapsed,
  setAboutMode: dispatchSetAboutMode,
})


export default connect(mapStateToProps, mapDispatchToProps)(App)

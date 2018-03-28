// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational'
// views
import { isLoadingView, tabIndexView, aboutModeView } from './App.reducer'
// actions
import {
  dispatchChangeTab,
  dispatchSetApi,
  dispatchFetchTodayData,
  dispatchCheckToSetSecondsElapsed,
  dispatchSetAboutMode,
} from './App.action'


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

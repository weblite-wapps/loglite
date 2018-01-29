// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// actions
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData } from './App.action'
import { dispatchConvertJSONToCSV } from '../components/Report/Main/Report.action'


const mapStateToProps = state => ({
  CSV: state.Report.CSV,
  isLoading: state.App.isLoading,
  tabIndex: state.App.tabIndex,
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
  convertJSONToCSV: dispatchConvertJSONToCSV,
})


export default connect(mapStateToProps, mapDispatchToProps)(App)

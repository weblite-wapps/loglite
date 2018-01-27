// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// actions
import { changeTab, setAPI, fetchTodayData } from './App.action'
import { convertJSONToCSV } from '../components/Report/Main/Report.action'


const mapStateToProps = state => ({
  CSV: state.Report.CSV,
  isLoading: state.App.isLoading,
  tabIndex: state.App.tabIndex,
})

const mapDispatchToProps = dispatch => ({
  changeTab: value => dispatch(changeTab(value)),
  setAPI: () => dispatch(setAPI()),
  fetchTodayData: () => dispatch(fetchTodayData()),
  convertJSONToCSV: () => dispatch(convertJSONToCSV()),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)

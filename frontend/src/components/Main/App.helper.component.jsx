// modules
import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import MuiTabs, { Tab } from 'material-ui/Tabs'
// styles
import scssClasses from './App.scss'

export const Logo = ({ isLoading, setAboutMode }) => (
  <div
    className={scssClasses.logoContainer}
    onClick={() => setAboutMode(true)}
    role="button"
    tabIndex="0"
  >
    <div className={isLoading ? scssClasses.loading : scssClasses.normal}>
      <CircularProgress size={40} color="primary" className={scssClasses.progress} />
      <img alt="loglite logo" src="assets/logo.jpg" className={scssClasses.logo} />
    </div>
  </div>
)

Logo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}


export const Tabs = ({ tabIndex, aboutMode, changeTab }) => (
  <MuiTabs
    value={tabIndex}
    onChange={(event, value) => changeTab(value)}
    indicatorColor={aboutMode ? '#cfcfcf' : '#000000'}
    fullWidth
    centered
    className={scssClasses.Tabs}
  >
    <Tab label="Home" value="Home" className={scssClasses.Tab} />
    <Tab label="Add" value="Add" className={scssClasses.Tab} />
    <Tab label="Report" value="Report" className={scssClasses.Tab} />
  </MuiTabs>
)

Tabs.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  aboutMode: PropTypes.bool.isRequired,
  changeTab: PropTypes.func.isRequired,
}
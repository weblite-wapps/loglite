// modules
import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Tooltip from '@material-ui/core/Tooltip'
// styles
import './App.scss'

export const Logo = ({ isLoading, setAboutMode }) => (
  <Tooltip
    title="About"
    placement="bottom"
    enterDelay={150}
    leaveDelay={150}
  >
    <div
      className="logoContainer"
      onClick={() => setAboutMode(true)}
      role="button"
      tabIndex="0"
    >
      <div className={isLoading ? 'loading' : 'normal'}>
        <CircularProgress size={40} color="primary" className="progress" />
        <img alt="Loglite logo" src="logo.jpg" className="logo" />
      </div>
    </div>
  </Tooltip>
)

Logo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

export const Tabs = ({ tabIndex, aboutMode, changeTab }) => (
  <MuiTabs
    value={tabIndex}
    onChange={(event, value) => changeTab(value)}
    indicatorColor={aboutMode ? 'primary' : 'secondary'}
    variant="fullWidth"
    centered
    className="Tabs"
  >
    <Tab label="Home" value="Home" className="Tab" />
    <Tab label="Add" value="Add" className="Tab" />
    <Tab label="Report" value="Report" className="Tab" />
  </MuiTabs>
)

Tabs.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  aboutMode: PropTypes.bool.isRequired,
  changeTab: PropTypes.func.isRequired,
}

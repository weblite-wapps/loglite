// modules
import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
// components
import Summary from '../components/Summary/Summary.container.react'
// helpers
import { TodayWorkList, FabButton } from './Home.helper.component'
// style
import scssClasses from './Home.scss'


const Home = ({ logs, setAboutMode }) => (
  <div className={scssClasses.normal}>
    <Summary />
    <Divider />
    <TodayWorkList logs={logs} />
    <FabButton onClick={() => setAboutMode(true)} />
  </div>
)

Home.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

export default Home

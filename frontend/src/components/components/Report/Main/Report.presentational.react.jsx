// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import MuiButton from 'material-ui/Button'
import format from 'date-fns/format'
// icons
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import ViewList from 'material-ui-icons/ViewList'
import FileDownload from 'material-ui-icons/FileDownload'
import InsertChart from 'material-ui-icons/InsertChart'
// components
import Custom from '../components/Custom/Custom.container.react'
import WorkList from '../components/WorkList/Main/WorkList.container.react'
import CustomizedPieChart from '../components/WorkList/components/PieChart.presentational.react'
import ShowChart from '../components/ShowChart/Main/ShowChart.container.react'
// scssClasses
import scssClasses from './Report.scss'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#505050',
        color: 'white',
        minHeight: '35px',
        minWidth: '35px',
        padding: '0px',
        borderRadius: '0px',
        margin: '0px',
        border: '0.5px solid white',
      },
      disabled: {
        color: '#919191',
      },
    },
  },
})

export default class Report extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickWorkList = this._handleClickWorkList.bind(this)
    this.handleClickCustom = this._handleClickCustom.bind(this)
    this.handleClickChart = this._handleClickChart.bind(this)
    this.state = {
      expandedShowChart: false,
      expandedCustom: false,
      expandedWorkList: true,
    }
  }

  _handleClickWorkList() {
    this.setState({
      expandedShowChart: false,
      expandedCustom: false,
      expandedWorkList: true,
      isCustom: false,
    })
  }

  _handleClickCustom() {
    this.setState({
      expandedShowChart: false,
      expandedCustom: true,
      expandedWorkList: false,
      isCustom: true,
    })
  }

  _handleClickChart() {
    this.setState({
      expandedCustom: false,
      expandedWorkList: false,
      expandedShowChart: true,
      isCustom: true,
    })
  }

  render() {
    const { logs, currentPage, totalDuration, totalDurationFromServer,
      pieChartData, onPreviousClick, onNextClick } = this.props
    const { expandedCustom, expandedWorkList, expandedShowChart, isCustom } = this.state
    return (
      <div className={scssClasses.container}>
        <MuiThemeProvider theme={theme}>
          <div className={scssClasses.controllBar}>
            <div className={scssClasses.navigator}>
              <MuiButton onClick={onPreviousClick} disabled={isCustom}>
                <KeyboardArrowLeft />
              </MuiButton>
              <Typography type="body1" align="center" className={scssClasses.textSlider}>
                {isCustom ? 'CUSTOMIZED' : format(currentPage, 'YYYY-MM-DD')}
              </Typography>
              <MuiButton
                disabled={isCustom || format(currentPage, 'YYYY-MM-DD') === format(new Date(), 'YYYY-MM-DD')}
                onClick={onNextClick}
              >
                <KeyboardArrowRight />
              </MuiButton>
            </div>
            <MuiButton raised={expandedWorkList} onClick={this.handleClickWorkList}>
              <ViewList />
            </MuiButton>
            <MuiButton raised={expandedCustom} onClick={this.handleClickCustom}>
              <FileDownload />
            </MuiButton>
            <MuiButton raised={expandedShowChart} onClick={this.handleClickChart}>
              <InsertChart />
            </MuiButton>
          </div>
        </MuiThemeProvider>
        <Divider />
        <List disablePadding className={scssClasses.list}>
          <Collapse component="li" in={expandedCustom} timeout="auto" unmountOnExit>
            <Custom />
            <Divider />
            <div className={scssClasses.text}>
              <Typography type="subheading" >
                {totalDurationFromServer}
              </Typography>
            </div>
            <Divider />
          </Collapse>
          <Collapse component="li" in={expandedShowChart} timeout="auto" unmountOnExit>
            <ShowChart />
            <Divider />
          </Collapse>
          <Collapse component="li" in={expandedWorkList} timeout="auto" unmountOnExit>
            <div className={scssClasses.text}>
              <Typography type="subheading" >
                {totalDuration}
              </Typography>
            </div>
            <Divider />
            <div className={scssClasses.chart}>
              <CustomizedPieChart pieChartData={pieChartData} />
            </div>
            <Divider />
            {
              logs.filter(log => log.date === format(currentPage, 'YYYY-MM-DD')).map(log => (
                <WorkList
                  key={log._id}
                  log={log}
                />))
            }
          </Collapse>
        </List>
      </div>
    )
  }
}

Report.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  totalDuration: PropTypes.string.isRequired,
  totalDurationFromServer: PropTypes.string.isRequired,
  pieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

// modules
import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import MuiButton from 'material-ui/Button'
import MuiTextField from 'material-ui/TextField'
import format from 'date-fns/format'
// icons
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import ViewList from 'material-ui-icons/ViewList'
import FileDownload from 'material-ui-icons/FileDownload'
import InsertChart from 'material-ui-icons/InsertChart'
// selectors
import { getWorksDuration, getStaffWorksDuration } from '../../common/Common.selector'
// components
import Custom from '../components/Custom/Custom.container.react'
import WorkList from '../components/WorkList/Main/WorkList.container.react'
import CustomizedPieChart from '../components/WorkList/components/PieChart.presentational.react'
import ShowChart from '../components/ShowChart/Main/ShowChart.container.react'
// scssClasses
import scssClasses from './Report.scss'

const styles = () => ({
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})


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

class Report extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickWorkList = this._handleClickWorkList.bind(this)
    this.handleClickCustom = this._handleClickCustom.bind(this)
    this.handleClickChart = this._handleClickChart.bind(this)
    this.handleChangeSelect = this._handleChangeSelect.bind(this)
    this.state = {
      expandedShowChart: false,
      expandedCustom: false,
      expandedWorkList: true,
    }
  }

  _handleChangeSelect() {
    this.porps.changeSelectedUser()
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
    const {
      classes, userId, selectedUser, creator, users,
      changeSelectedUser, logs, staffLogs, currentPage, totalDuration, staffTotalDuration,
      totalDurationFromServer, pieChartData, staffPieChartData, onPreviousClick, onNextClick,
    } = this.props
    const { expandedCustom, expandedWorkList, expandedShowChart, isCustom } = this.state
    const getDuration =
      selectedUser === userId ? getWorksDuration : getStaffWorksDuration
    return (
      <div className={scssClasses.container}>
        <MuiThemeProvider theme={theme}>
          { creator ?
            <div className={scssClasses.textField}>
              <MuiTextField
                select
                fullWidth
                label="user name"
                value={selectedUser}
                onChange={e => changeSelectedUser(e.target.value)}
                style={{ marginTop: '0' }}
                InputProps={{
                    classes: {
                      inkbar: classes.textFieldInkbar,
                    },
                  }}
                InputLabelProps={{
                  className: classes.textFieldFormLabel,
                  shrink: true,
                  }}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: scssClasses.menu,
                  },
                }}
                margin="normal"
              >
                {users.map(user =>
                  <option key={user.id} value={user.id}>{user.name}</option>)}
              </MuiTextField>
            </div> : null }
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
                {selectedUser === userId ? totalDuration : staffTotalDuration}
              </Typography>
            </div>
            <Divider />
            <div className={scssClasses.chart}>
              <CustomizedPieChart
                pieChartData={
                  selectedUser === userId ? pieChartData : staffPieChartData}
              />
            </div>
            <Divider />
            {(selectedUser === userId ? logs : staffLogs)
              .filter(log => log.date === format(currentPage, 'YYYY-MM-DD')).map(log => (
                <WorkList
                  key={log._id}
                  log={log}
                  getDuration={getDuration}
                />))
            }
          </Collapse>
        </List>
      </div>
    )
  }
}

Report.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  userId: PropTypes.string.isRequired,
  creator: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  staffLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  totalDuration: PropTypes.string.isRequired,
  staffTotalDuration: PropTypes.string.isRequired,
  totalDurationFromServer: PropTypes.string.isRequired,
  pieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  staffPieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUser: PropTypes.string.isRequired,
  changeSelectedUser: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(Report)

// modules
import React from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// icons
import ViewList from 'material-ui-icons/ViewList'
import FileDownload from 'material-ui-icons/FileDownload'
import InsertChart from 'material-ui-icons/InsertChart'
// components
import SelectBar from '../components/common/SelectBar/SelectBar.container.react'
import Navigator from '../components/common/Navigator/Navigator.container.react'
import Custom from '../components/Custom/Custom.container.react'
import WorkList from '../components/WorkList/Main/WorkList.container.react'
import CustomizedPieChart from '../components/WorkList/components/PieChart.presentational.react'
import ShowChart from '../components/ShowChart/Main/ShowChart.container.react'
import Button from '../../../../helper/components/Button/Button.presentational.react'
// selectors
import { getWorksDuration, getStaffWorksDuration } from '../../../../helper/selectors/workDuration.selector'
// helpers
import { formattedDate } from '../../../../helper/functions/date.helper'
// scssClasses
import scssClasses from './Report.scss'


const Report = ({
  userId, selectedUser, logs, staffLogs, currentPage, totalDuration, staffTotalDuration,
  totalDurationFromServer, pieChartData, staffPieChartData, expandMode, changeExpandMode,
}) => {
  const getDuration = selectedUser === userId ? getWorksDuration : getStaffWorksDuration

  return (
    <div className={scssClasses.container}>
      <SelectBar />
      <div className={scssClasses.controllBar}>
        <Navigator isCustom={expandMode === 'custome'} />
        <Button
          raised={expandMode === 'workList'}
          onClick={() => changeExpandMode('workList')}
          componentName="Report"
        >
          <ViewList />
        </Button>
        <Button
          raised={expandMode === 'custome'}
          onClick={() => changeExpandMode('custome')}
          componentName="Report"
        >
          <FileDownload />
        </Button>
        <Button
          raised={expandMode === 'showChart'}
          onClick={() => changeExpandMode('showChart')}
          componentName="Report"
        >
          <InsertChart />
        </Button>
      </div>
      <Divider light />

      <List disablePadding className={scssClasses.list}>
        <Collapse component="li" in={expandMode === 'custome'} timeout="auto" unmountOnExit>
          <Custom />
          <Divider light />
          <div className={scssClasses.text}>
            <Typography type="subheading" >
              {totalDurationFromServer}
            </Typography>
          </div>
          <Divider light />
        </Collapse>

        <Collapse component="li" in={expandMode === 'showChart'} timeout="auto" unmountOnExit>
          <ShowChart />
          <Divider light />
        </Collapse>

        <Collapse component="li" in={expandMode === 'workList'} timeout="auto" unmountOnExit>
          <div className={scssClasses.text}>
            <Typography type="subheading" >
              {selectedUser === userId ? totalDuration : staffTotalDuration}
            </Typography>
          </div>
          <Divider light />
          <div className={scssClasses.chart}>
            <CustomizedPieChart
              pieChartData={
                selectedUser === userId ? pieChartData : staffPieChartData}
            />
          </div>
          <Divider light />
          {(selectedUser === userId ? logs : staffLogs)
            .filter(log => log.date === formattedDate(currentPage)).map(log => (
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

Report.propTypes = {
  userId: PropTypes.string.isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  staffLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.instanceOf(Date).isRequired,
  totalDuration: PropTypes.string.isRequired,
  staffTotalDuration: PropTypes.string.isRequired,
  totalDurationFromServer: PropTypes.string.isRequired,
  pieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  staffPieChartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUser: PropTypes.string.isRequired,
  expandMode: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
}

export default Report

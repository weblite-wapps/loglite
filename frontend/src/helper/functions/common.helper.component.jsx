// modules
import React from "react";
import PropTypes from "prop-types";
import startOfToday from "date-fns/start_of_today";
import subDays from "date-fns/sub_days";
// components
import Autocomplete from "../components/Autocomplete/Autocomplete.presentational";
import CustomizedButton from "../components/Button/Button.presentational";
import TagList from "../components/TagList/TagList.presentational";
import Picker from "../components/Picker/Picker.presentational";
import Button from "../../helper/components/Button/Button.presentational";
import CustomizedBarChart from "../../helper/components/BarCharts/BarChart.presentational";
import CustomizedDoubleBarChart from "../../helper/components/BarCharts/DoubleBarChart.presentational"
// helpers
import { formattedDate } from "../../helper/functions/date.helper";
// styles
import "./common.scss";

export const TagPanel = ({
  suggestions,
  queryTag,
  onQueryTagChange,
  tags,
  onTagClick,
  handleAddTag
}) => (
  <React.Fragment>
    <div className="textField">
      <Autocomplete
        label="Tags"
        suggestions={suggestions}
        inputValue={queryTag}
        onInputValueChange={e => onQueryTagChange(e.target.value)}
        onSelect={value => onQueryTagChange(value)}
        onAdd={handleAddTag}
      />
      <CustomizedButton
        label="ADD"
        onClick={handleAddTag}
        componentName="Add"
      />
    </div>
    <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
  </React.Fragment>
);

TagPanel.propTypes = {
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired
};

export const Pickers = ({
  isError,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => (
  <React.Fragment>
    <Picker
      label="Start date"
      type="date"
      isError={isError.startDate}
      value={startDate}
      onChange={onStartDateChange}
    />
    <Picker
      label="End date"
      type="date"
      isError={isError.endDate}
      value={endDate}
      onChange={onEndDateChange}
    />
  </React.Fragment>
);

Pickers.propTypes = {
  isError: PropTypes.shape({}).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired
};

export const Buttons = ({ startDate, endDate, update, handleUpdate }) => {
  const now = new Date()

  return (
    <React.Fragment>
      <div className="insertButton">
        <Button
          label="Insert Chart"
          componentName="Add"
          onClick={() => handleUpdate(startDate, endDate)}
        />
      </div>

      <div className="buttons">
        <Button
          label="Today"
          componentName="CustomAdd"
          onClick={() =>
            update(
              formattedDate(startOfToday(now)),
              formattedDate(now)
            )
          }
        />
        <Button
          label="This Week"
          componentName="CustomAdd"
          onClick={() =>
            update(
              formattedDate(subDays(now, 6)),
              formattedDate(now)
            )
          }
        />
        <Button
          label="This Month"
          componentName="CustomAdd"
          onClick={() =>
            update(
              formattedDate(subDays(now, 29)),
              formattedDate(now)
            )
          }
        />
      </div>
    </React.Fragment>
  )
}

Buttons.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

export const BarChart = ({ data, XDataKey, YDataKey }) =>
  data.length ? (
    <div className="chart">
      <CustomizedBarChart
        barChartData={data}
        XDataKey={XDataKey}
        YDataKey={YDataKey}
      />
    </div>
  ) : null;

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  XDataKey: PropTypes.string.isRequired,
  YDataKey: PropTypes.string.isRequired
}

export const DoubleBarChart = ({ data, XDataKey, YDataKey }) =>
  data.length ? (
    <div className="chart">
      <CustomizedDoubleBarChart
        barChartData={data}
        XDataKey={XDataKey}
        YDataKey={YDataKey}
      />
    </div>
  ) : null;

DoubleBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  XDataKey: PropTypes.string.isRequired,
  YDataKey: PropTypes.string.isRequired
}


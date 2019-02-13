// modules
import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
// components
import TagShape from "../../../../../../helper/components/TagShapeForReport/TagShapeForReport.presentational";
// helpers
import { formattedSeconds } from "../../../../Home/components/TodayWork/TodayWork.helper";
// styles
import "./WorkList.scss";

export const TitleAndDuration = ({
  log: { title, times },
  workDuration,
  len,
  secondsElapsed
}) => (
    <div className="workList-text">
      <div>
        <Typography variant="subheading">{title}</Typography>
      </div>
      <div>
        <Typography variant="body2" align="right">
          {len && times[len - 1].end === "running"
            ? formattedSeconds(secondsElapsed)
            : workDuration}
        </Typography>
      </div>
    </div>
  );

TitleAndDuration.propTypes = {
  log: PropTypes.shape({}).isRequired,
  workDuration: PropTypes.string.isRequired,
  len: PropTypes.number.isRequired,
  secondsElapsed: PropTypes.number.isRequired
};

export const Tags = ({ log: { tags } }) => (
  <div className="workList-tags">
    {tags.map((tag, index) => (
      <TagShape key={index} tag={tag} />
    ))}
  </div>
);

Tags.propTypes = {
  log: PropTypes.shape({}).isRequired
};

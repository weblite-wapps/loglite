// modules
import React from "react";
import PropTypes from "prop-types";
import { CSVDownload } from "react-csv";
// components
import Button from "../../../../../helper/components/Button/Button.presentational";
// styles
import "./Custom.scss";

export const Buttons = ({ onCalculation, onExport }) => (
  <div className="custom-buttons">
    <Button label="Calculate" onClick={onCalculation} componentName="Add" />
    <span style={{ margin: "5px" }} />
    <Button label="Export" onClick={onExport} componentName="Add" />
  </div>
);

Buttons.propTypes = {
  onCalculation: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired
};

export const CSVDownloader = ({ CSV }) =>
  CSV && (
    <CSVDownload
      data={CSV}
      separator=";"
      filename="LogliteReport.csv"
      target="_self"
    />
  );

CSVDownloader.propTypes = {
  CSV: PropTypes.string.isRequired
};

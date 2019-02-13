// modules
import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
// components
import Summary from "../components/Summary/Summary.container.react";
// helpers
import { TodayWorkList, FabButton } from "./Home.helper.component";
// styles
import "./Home.scss";

const Home = ({ logs, changeTab }) => (
  <div className="home-normal">
    <Summary />
    <Divider />
    <TodayWorkList logs={logs} />
    <FabButton onClick={() => changeTab("Add")} />
  </div>
);

Home.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTab: PropTypes.func.isRequired
};

export default Home;

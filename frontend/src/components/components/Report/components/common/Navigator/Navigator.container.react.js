// modules
import { connect } from 'react-redux'
// components
import Navigator from './Navigator.presentational.react'
// actions
import {
  dispatchDecrementCurrentPage,
  dispatchIncrementCurrentPage,
} from '../../../Main/Report.action'


const mapStateToProps = (state, ownProps) => ({
  isCustom: ownProps.isCustom,
  currentPage: state.Report.currentPage,
})

const mapDispatchToProps = () => ({
  onPreviousClick: dispatchDecrementCurrentPage,
  onNextClick: dispatchIncrementCurrentPage,
})


export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

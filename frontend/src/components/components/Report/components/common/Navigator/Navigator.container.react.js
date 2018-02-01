// modules
import { connect } from 'react-redux'
// components
import Navigator from './Navigator.presentational.react'
// actions
import {
  dispatchPreviousPage,
  dispatchNextPage,
} from '../../../Main/Report.action'


const mapStateToProps = (state, ownProps) => ({
  isCustom: ownProps.isCustom,
  currentPage: state.Report.currentPage,
})

const mapDispatchToProps = () => ({
  onPreviousClick: () => dispatchPreviousPage(),
  onNextClick: () => dispatchNextPage(),
})


export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

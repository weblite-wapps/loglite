// modules
import { connect } from 'react-redux'
// components
import Navigator from './Navigator.presentational.react'
// actions
import { decrementCurrentPage, incrementCurrentPage } from '../../../Main/Report.action'


const mapStateToProps = (state, ownProps) => ({
  isCustom: ownProps.isCustom,
  currentPage: state.Report.currentPage,
})

const mapDispatchToProps = dispatch => ({
  onPreviousClick: () => dispatch(decrementCurrentPage()),
  onNextClick: () => dispatch(incrementCurrentPage()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

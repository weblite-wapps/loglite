// modules
import { connect } from 'react-redux'
// components
import Navigator from './Navigator.presentational'
// views
import { currentPageView } from '../../Main/Report.reducer'
// actions
import { dispatchPreviousPage, dispatchNextPage } from '../../Main/Report.action'


const mapStateToProps = (_, { isActive }) => ({
  isActive,
  currentPage: currentPageView(),
})

const mapDispatchToProps = () => ({
  onPreviousClick: () => dispatchPreviousPage(),
  onNextClick: () => dispatchNextPage(),
})


export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

// modules
import { connect } from 'react-redux'
// components
import Custom from './Custom.presentational.react'
// views
import { expandedView } from '../../../Main/Add.reducer'
// actions
import { dispatchToggleExpanded } from '../../../Main/Add.action'


const mapStateToProps = () => ({ expanded: expandedView() })

const mapDispatchToProps = () => ({ onExpand: dispatchToggleExpanded })


export default connect(mapStateToProps, mapDispatchToProps)(Custom)

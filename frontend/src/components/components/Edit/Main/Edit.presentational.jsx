import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
  Transition,
  ContentWithStyle as Content,
  AppBarWithStyle as AppBar,
} from './Edit.helper'

const Edit = props => (
  <Dialog
    open={props.isOpen}
    fullScreen
    transitionDuration={300}
    TransitionComponent={Transition}
  >
    <AppBar {...props} />
    <Content {...props} />
  </Dialog>
)

export default Edit

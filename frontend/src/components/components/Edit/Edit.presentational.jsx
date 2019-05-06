import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Transition, Content, AppBar } from './Edit.helper'

const Edit = props => (
  <Dialog
    open
    fullScreen
    transitionDuration={1000}
    TransitionComponent={Transition}
  >
    <AppBar {...props} />
    <Content {...props} />
  </Dialog>
)

export default Edit

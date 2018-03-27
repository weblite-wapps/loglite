// modules
import React from 'react'
import List from 'material-ui/List'
// helpers
import { Buttons, Collapse } from './Custom.helper.component'
// css
import scssClasses from './Custom.scss'

export default props => (
  <div>
    <List disablePadding className={scssClasses.list}>
      <Buttons {...props} />
      <Collapse {...props} />
    </List>
  </div>
)

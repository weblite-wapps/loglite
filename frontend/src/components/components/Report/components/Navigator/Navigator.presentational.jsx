import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// helpers
import { Button, Text } from './Navigator.helper.component'
// styles
import scssClasses from './Navigator.scss'
import styles from './Navigator.style'


const Navigator = props => (
  <div className={scssClasses.navigator}>
    <Button {...props} direction="Back" />
    <Text {...props} />
    <Button {...props} direction="Next" />
  </div>
)

export default withStyles(styles)(Navigator)

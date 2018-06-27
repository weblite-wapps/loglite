// modules
import React from 'react'
import Typography from '@material-ui/core/Typography'
// sccsClasses
import scssClasses from './About.scss'

export default () => (
  <div className={scssClasses.container}>
    <img alt="loglite about" src="assets/about.jpg" align="middle" />
    <Typography variant="subheading" align="center" gutterBottom>
      Version 2.0.0
    </Typography>
    <Typography variant="subheading" align="center" gutterBottom>
      All right reserved
    </Typography>
  </div>
)

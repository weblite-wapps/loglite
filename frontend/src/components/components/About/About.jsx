// modules
import React from 'react'
import Typography from 'material-ui/Typography'
// sccsClasses
import sccsClasses from './About.scss'


export default function About() {
  return (
    <div className={sccsClasses.container}>
      <img alt="loglite about" src="assets/about.jpg" align="middle" />
      <Typography type="subheading" align="center" gutterBottom>
        Version 1.1.0
      </Typography>
      <Typography type="subheading" align="center" gutterBottom>
        All right reserved
      </Typography>
    </div>
  )
}

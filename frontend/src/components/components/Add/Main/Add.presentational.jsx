// modules
import React from 'react'
// components
import Custom from '../components/Custom/Custom.container.react'
// helpers
import { TagPanel } from '../../../../helper/functions/common.helper.component'
import { TextField } from './Add.helper.component'
// scssClasses
import scssClasses from './Add.scss'


export default props => (
  <div className={scssClasses.container}>
    <TextField {...props} />
    <TagPanel {...props} />
    <Custom {...props} />
  </div>
)

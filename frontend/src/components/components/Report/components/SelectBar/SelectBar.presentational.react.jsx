import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiTextField from 'material-ui/TextField'
// scssClasses
import scssClasses from './SelectBar.scss'
import styles from '../../../../../helper/style/appStyle'


function SelectBar(props) {
  const { creator, selectedUser, users, changeSelectedUser, classes } = props
  return (
    <div>
      { creator ?
        <div className={scssClasses.textField}>
          <MuiTextField
            select
            fullWidth
            label="user name"
            value={selectedUser}
            onChange={e => changeSelectedUser(e.target.value)}
            style={{ marginTop: '0' }}
            InputProps={{
                classes: {
                  inkbar: classes.textFieldInkbar,
                },
              }}
            InputLabelProps={{
              className: classes.textFieldFormLabel,
              shrink: true,
              }}
            SelectProps={{
              native: true,
              MenuProps: {
                className: scssClasses.menu,
              },
            }}
            margin="normal"
          >
            {users.map(user =>
              <option key={user.id} value={user.id}>{user.name}</option>)}
          </MuiTextField>
        </div> : null
      }
    </div>
  )
}

SelectBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  creator: PropTypes.bool.isRequired,
  selectedUser: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeSelectedUser: PropTypes.func.isRequired,
}


export default withStyles(styles)(SelectBar)

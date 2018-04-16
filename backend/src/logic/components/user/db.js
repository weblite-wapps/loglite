// models
import User from '../../../models/user'


export const fetchUsers = async query => User
  .find(query)
  .sort({ name: 1 })
  .exec()

export const saveUser = async user => new User(user)
  .save()

export const countUser = async query => User
  .find(query)
  .count()
  .exec()

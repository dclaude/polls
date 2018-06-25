import { combineReducers } from 'redux'
import authent from './authent'
import polls from './polls'
import users from './users'

export default combineReducers({
  authent,
  polls,
  users,
})


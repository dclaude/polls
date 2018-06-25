import { userSet, usersSubscribe } from '../api/firebase'
import logger from '../logger'

const USERS_ADD = 'USERS_ADD'

function usersAdd(users) {
  return {
    type: USERS_ADD,
    users,
  }
}

export function handleUserUpdate({ uid, displayName, photoURL }) {
  const user = { uid, displayName, photoURL }
  return (dispatch) => {
    // no need to update redux store since the firebase event listener will automatically refresh the poll
    return userSet(user)
      .catch((error) => logger.log(`userSet() failed ${error}`))
  }
}

export function handleUsersSubscribe() {
  return (dispatch) => {
    usersSubscribe((users) => {
      logger.log('usersSubscribe cb')
      dispatch(usersAdd(users))
    })
  }
}

export default function users(state = {}, action) {
  switch (action.type) {
    case USERS_ADD: {
      return action.users
    }
    default:
      return state
  }
}


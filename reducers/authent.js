import { handleUserUpdate } from './users'

const AUTHED = 'AUTHED'

function authed(userId) {
  return {
    type: AUTHED,
    userId,
  }
}

export function handleUserAuthed(user) {
  return (dispatch) => {
    dispatch(authed(user.uid))
    dispatch(handleUserUpdate(user))
  }
}

const initialState = {
  userId: null,
}

export default function authent(state = initialState, action) {
  switch (action.type) {
    case AUTHED:
      return {
        ...state,
        userId: action.userId,
      }
    default:
      return state
  }
}


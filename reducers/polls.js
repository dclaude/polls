import { pollSet, pollsSubscribe, pollUpdate } from '../api/firebase'
import { generateId } from '../utils'
import logger from '../logger'

const POLLS_ADD = 'POLLS_ADD'

function pollsAdd(polls) {
  return {
    type: POLLS_ADD,
    polls,
  }
}

export function handlePollAdd(title, options) {
  return (dispatch, getState) => {
    const { authent, users } = getState()
    const poll = {
      uid: generateId(),
      title,
      options,
      author: authent.userId,
      votes: {}, // { { userId: optionIndex }, ... }
    }
    // no need to update redux store since the firebase event listener will automatically refresh the poll
    return pollSet(poll)
      .catch((error) => {
        logger.log(`pollSet() failed ${error}`)
      })
  }
}

export function handlePollsSubscribe() {
  return (dispatch) => {
    pollsSubscribe((polls) => {
      logger.log('pollsSubscribe cb')
      dispatch(pollsAdd(polls))
    })
  }
}

export function handlePollVote(pollId, optionIndex) {
  return (dispatch, getState) => {
    const { authent, polls } = getState()
    const { userId } = authent
    const poll = polls[pollId]
    if (!poll) {
      logger.log(`handlePollVote() poll ${pollId} not found`)
      return
    }
    const update = {
      uid: pollId,
      votes: {
        ...poll.votes,
        [userId]: optionIndex,
      },
    }
    /*
    - merge the 'update' object with the poll object already in firebase
    - no need to update redux store since the firebase event listener will automatically refresh the poll
    */
    pollUpdate(update)
      .catch((error) => {
        logger.log(`pollUpdate() failed ${error}`)
      })
  }
}

export default function polls(state = {}, action) {
  switch (action.type) {
    case POLLS_ADD: {
      return action.polls
    }
    default:
      return state
  }
}


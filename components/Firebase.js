import React from 'react'
import PropTypes from 'prop-types'
import { initializeApp, onAuthStateChanged, signInAndRetrieveDataWithCredential } from '../api/firebase'
import logger from '../logger'

const AuthStatus = Object.freeze({ AUTHING: 1, AUTHED: 2, NOT_AUTHED: 3 })

class Firebase extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    onLogged: PropTypes.func,
    onError: PropTypes.func,
  }
  static AuthStatus = AuthStatus
  initialState = {
    authStatus: AuthStatus.AUTHING,
    user: null,
  }
  state = this.initialState
  componentDidMount() {
    const { config, onLogged } = this.props
    initializeApp(config)
    /*
    - if the user is already authent a user is received in the onAuthStateChanged() callback
    cf https://firebase.google.com/docs/auth/web/manage-users
    - Authentication State Persistence
    https://firebase.google.com/docs/auth/web/auth-state-persistence
    + You can specify how the Authentication state persists when using the Firebase JS SDK. 
    This includes the ability to specify whether a signed in user should be indefinitely persisted until explicit sign out, 
    cleared when the window is closed or cleared on page reload.
    + For a web application, the default behavior is to persist a user's session even after the user closes the browser. 
    This is convenient as the user is not required to continuously sign-in every time the web page is visited on the same device.
    */
    this.unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        logger.log(`Firebase onAuthStateChanged() user ${user.uid} is now authenticated`);
        onLogged(user)
        this.setState(
          () => ({
            authStatus: AuthStatus.AUTHED,
            user,
          }))
      }
      else {
        logger.log('Firebase onAuthStateChanged() no user');
        this.setState(() => ({
          authStatus: AuthStatus.NOT_AUTHED,
          user: null,
        }))
      }
    })
  }
  loginWithFacebookCredential = (token) => {
    const { onError } = this.props
    this.setState(() => this.initialState) // to hide the login button during firebase authent
    signInAndRetrieveDataWithCredential(token)
      .then(({ user }) => {
        logger.log(`Firebase login success ${user.uid}`)
        // the onAuthStateChanged() callback will then be triggered
      })
      .catch((error) => {
        logger.log('signInAndRetrieveDataWithCredential catch')
        const msg = `Firebase login failed ${error}`
        logger.log(msg)
        if (onError)
          onError(msg)
        this.setState(() => ({
          authStatus: AuthStatus.NOT_AUTHED,
          user: null,
        }))
      })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const { authStatus, user } = this.state
    const { children } = this.props
    return children({
      authStatus,
      loginWithFacebookCredential: this.loginWithFacebookCredential,
    })
  }

}

export default Firebase


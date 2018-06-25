import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Firebase from './Firebase'
import FacebookLogin from './FacebookLogin'
import Navigator from './Navigator'
import logger from '../logger'
import { firebaseWebConfig } from '../config'
import { connect } from 'react-redux'
import { handleUserAuthed } from '../reducers/authent'
import { handlePollsSubscribe } from '../reducers/polls'
import { handleUsersSubscribe } from '../reducers/users'

class Authent extends React.Component {
  handleLogged = (user) => {
    const { dispatch } = this.props
    dispatch(handleUserAuthed(user))
    dispatch(handlePollsSubscribe())
    dispatch(handleUsersSubscribe())
  }
  handleError = (msg) => {
    Alert.alert(msg)
  }
  render() {
    return (
      <Firebase
        config={firebaseWebConfig}
        onLogged={this.handleLogged}
        onError={this.handleError}
      >
        {({ authStatus, loginWithFacebookCredential }) => {
          logger.log(`Authent render() ${authStatus}`)
          switch (authStatus) {
            case Firebase.AuthStatus.AUTHING:
              return (
                <View style={styles.container}>
                  <Text>Firebase authentication</Text>
                  <ActivityIndicator
                    size='small'
                    style={styles.activityIndicator}
                    color='blue' />
                </View>
              )
            case Firebase.AuthStatus.NOT_AUTHED:
              return (
                <View style={styles.container}>
                  <FacebookLogin onLogged={loginWithFacebookCredential} />
                </View>
              )
            case Firebase.AuthStatus.AUTHED:
              return <Navigator />
          }
        }}
      </Firebase>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginTop: 30,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect()(Authent)


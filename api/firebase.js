import firebase from 'firebase'
import logger from '../logger'

export function initializeApp(config) {
  logger.log('Firebase initializeApp()')
  firebase.initializeApp(config)
}

export function onAuthStateChanged(cb) {
  return firebase.auth().onAuthStateChanged(cb)
}

export function signInAndRetrieveDataWithCredential(facebookToken) {
  logger.log('Firebase signInAndRetrieveDataWithCredential()')
  // build firebase credential with the facebook access token
  const credential = firebase.auth.FacebookAuthProvider.credential(facebookToken)
  // sign in with credential from the facebook user
  return firebase.auth().signInAndRetrieveDataWithCredential(credential)
}

export function signOut() {
  logger.log('Firebase logout')
  firebase.auth().signOut()
}

export function pollSet(poll) {
  logger.log('Firebase pollSet()', poll)
  // .set(): replace the entry in firebase with the object provided in arg
  return firebase.database().ref().child(`polls/${poll.uid}`)
    .set(poll)
}

export function pollUpdate(poll) {
  logger.log('Firebase pollUpdate()', poll)
  // .update(): merge the entry in firebase with the object provided in arg
  return firebase.database().ref().child(`polls/${poll.uid}`)
    .update(poll)
}

export function pollsSubscribe(cb) {
  logger.log('Firebase pollsSubscribe()')
  firebase.database().ref().child('polls')
    .on('value', (snapshot) => cb(snapshot.val() || {}))
}

export function userSet(user) {
  logger.log('Firebase userSet()', user)
  return firebase.database().ref().child(`users/${user.uid}`)
    .set(user)
}

export function usersSubscribe(cb) {
  logger.log('Firebase usersSubscribe()')
  firebase.database().ref().child('users')
    .on('value', (snapshot) => cb(snapshot.val() || {}))
}


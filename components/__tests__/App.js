import React from 'react'
import { Text, TouchableOpacity, Alert } from 'react-native'
import TestRenderer from 'react-test-renderer'
import { onAuthStateChanged, signInAndRetrieveDataWithCredential, userSet } from '../../api/firebase'
import { login } from '../../api/facebook'
import App from '../../App'
import { wait } from '../../__mocks__/util'
//
// mocks all the functions of the following files with an empty implementation:
jest.mock('../../api/firebase')
jest.mock('../../api/facebook')

beforeAll(() => {
  userSet.mockImplementation(() => Promise.resolve())
})

// async needed because of the use of wait() with await
it('can login with facebook', async () => {
  // override the empty mock implem:
  let stateChangedUserCb = null
  onAuthStateChanged.mockImplementation((cb) => {
    const user = null
    cb(user)
    stateChangedUserCb = cb
  })
  login.mockImplementation(() => {
    return Promise.resolve({ type: 'success', token: {} })
  })
  signInAndRetrieveDataWithCredential.mockImplementation(() => {
    const user = { uid: 'testUserId' }
    stateChangedUserCb(user)
    return Promise.resolve({ user })
  })
  //
  const testRenderer = TestRenderer.create(<App />)
  const testInstance = testRenderer.root
  const touchables = testInstance.findAllByType(TouchableOpacity)
    .filter(item => item.findByType(Text).instance.props['children'] === 'Facebook Login')
  expect(touchables.length).toBe(1)
  const facebookLoginTouchable = touchables[0]
  facebookLoginTouchable.instance.props.onPress()
  //
  await wait(() => {
    //console.log(JSON.stringify(testRenderer.toJSON(), 0 , 2))
    const textInstances = testInstance.findAllByType(Text).filter(item => item.instance.props['children'] === 'Home')
    return expect(textInstances.length).toBeTruthy()
  })
  expect(testRenderer).toBeTruthy()
})

it('renders home page if firebase authent is still valid', async () => {
  onAuthStateChanged.mockImplementation((cb) => {
    const user = { user: { uid: 'testUserId' }}
    cb(user)
  })
  const testRenderer = TestRenderer.create(<App />)
  const testInstance = testRenderer.root
  await wait(() => {
    //console.log(JSON.stringify(testRenderer.toJSON(), 0 , 2))
    const textInstances = testInstance.findAllByType(Text).filter(item => item.instance.props['children'] === 'Home')
    return expect(textInstances.length).toBeTruthy()
  })
  expect(testRenderer).toBeTruthy()
})

it('renders an alert if firebase login failed', async () => {
  let stateChangedUserCb = null
  onAuthStateChanged.mockImplementation((cb) => {
    const user = null
    cb(user)
    stateChangedUserCb = cb
  })
  login.mockImplementation(() => {
    return Promise.resolve({ type: 'success', token: {} })
  })
  signInAndRetrieveDataWithCredential.mockImplementation(() => {
    return new Promise(() => {
      throw new Error('firebase signInAndRetrieveDataWithCredential() failed')
    })
  })
  const spy = jest.spyOn(Alert, 'alert') // mock the function Alert.alert() from react-native
  //
  const testRenderer = TestRenderer.create(<App />)
  const testInstance = testRenderer.root
  const touchables = testInstance.findAllByType(TouchableOpacity)
    .filter(item => item.findByType(Text).instance.props['children'] === 'Facebook Login')
  expect(touchables.length).toBe(1)
  const facebookLoginTouchable = touchables[0]
  facebookLoginTouchable.instance.props.onPress()
  //
  await wait(() => {
    //console.log(JSON.stringify(testRenderer.toJSON(), 0 , 2))
    expect(spy).toHaveBeenCalledTimes(1)
    return expect(spy).toHaveBeenCalledWith('Firebase login failed Error: firebase signInAndRetrieveDataWithCredential() failed') // first arg
  })
  expect(testRenderer).toBeTruthy()
  //
  spy.mockReset()
  spy.mockRestore()
})


import React from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import TestRenderer from 'react-test-renderer'
import FacebookLogin from '../FacebookLogin'
import { wait } from '../../__mocks__/util'
import { login } from '../../api/facebook'

jest.mock('../../api/facebook')

it('renders an alert if facebook login failed', async () => {
  login.mockImplementation(() => {
    return new Promise(() => {
      throw new Error('facebook login failed')
    })
  })
  const spy = jest.spyOn(Alert, 'alert') // mock the function Alert.alert() from react-native
  //
  const testRenderer = TestRenderer.create(<FacebookLogin onLogged={() => {}} />)
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
    return expect(spy).toHaveBeenCalledWith('Facebook login failed Error: facebook login failed') // first arg
  })
  expect(testRenderer).toBeTruthy()
  //
  spy.mockReset()
  spy.mockRestore()
})

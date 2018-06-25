import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

// use <StatusBar> for the navbar to not overlap the notification bar of the phone
export default () => (
  <View style={{ height: Constants.statusBarHeight }}>
    <StatusBar translucent />
  </View>
)


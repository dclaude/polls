import React from 'react'
import { Ionicons } from 'react-native-vector-icons'

export default ({ focused, tintColor }) => (
  <Ionicons name={`ios-home${focused ? '' : '-outline'}`} size={25} color={tintColor} />
)


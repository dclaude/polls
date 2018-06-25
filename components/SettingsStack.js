import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Settings from './Settings'

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
    },
  },
)

export default SettingsStack



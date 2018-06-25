import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import HomeStack from './HomeStack'
import YourPollsStack from './YourPollsStack'
import SettingsStack from './SettingsStack'
import Drawer from './Drawer'
import { Ionicons } from 'react-native-vector-icons'
import HomeIcon from './icons/Home'
import YourPollsIcon from './icons/YourPolls'
import SettingsIcon from './icons/Settings'

const Navigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => <HomeIcon focused={focused} tintColor={tintColor} />
      },
    },
    YourPolls: {
      screen: YourPollsStack,
      navigationOptions: {
        drawerLabel: 'Your Polls',
        drawerIcon: ({ focused, tintColor }) => <YourPollsIcon focused={focused} tintColor={tintColor} />
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => <SettingsIcon focused={focused} tintColor={tintColor} />
      },
    },
  },
  {
    // from https://reactnavigation.org/docs/en/drawer-navigator.html
    contentComponent: Drawer,
  }
)

export default Navigator


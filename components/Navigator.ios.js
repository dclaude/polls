import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import HomeStack from './HomeStack'
import YourPollsStack from './YourPollsStack'
import SettingsStack from './SettingsStack'
import { Ionicons } from 'react-native-vector-icons'
import HomeIcon from './icons/Home'
import YourPollsIcon from './icons/YourPolls'
import SettingsIcon from './icons/Settings'

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    YourPolls: YourPollsStack,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        switch (routeName) {
          case 'Home':
            return <HomeIcon focused={focused} tintColor={tintColor} />
          case 'YourPolls':
            return <YourPollsIcon focused={focused} tintColor={tintColor} />
          case 'Settings':
            return <SettingsIcon focused={focused} tintColor={tintColor} />
        }
      },
    }),
  },
)


import React from 'react'
import { createStackNavigator } from 'react-navigation'
import YourPolls from './YourPolls'

const YourPollsStack = createStackNavigator(
  {
    YourPolls: {
      screen: YourPolls,
    },
  },
)

export default YourPollsStack


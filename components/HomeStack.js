import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from './Home'
import NewPoll from './NewPoll'
import Poll from './Poll'
import { colors } from '../styles'

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    NewPoll: {
      screen: NewPoll,
    },
    Poll: {
      screen: Poll,
    },
  },
)

export default HomeStack


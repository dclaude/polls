import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import NavigationBar from 'react-native-navbar'
import StatusBar from './StatusBar'

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

function Navbar({ title, rightButton, leftButton }) {
  const optionalAttrs = {}
  if (rightButton) {
    const additionalProps = {
      /*
      this style property is not used by react-native-navbar 
      but it forwarded to the props of the react component associated to the rightButton
      (e.g. <Hamburger>)
      */
      style: {
        marginRight: 10,
        justifyContent: 'center',
      },
    }
    optionalAttrs.rightButton = React.cloneElement(rightButton, additionalProps)
  }
  if (leftButton) {
    const additionalProps = {
      style: {
        marginLeft: 10,
        justifyContent: 'center',
      },
    }
    optionalAttrs.leftButton = React.cloneElement(leftButton, additionalProps)
  }
  return (
    <View>
      <StatusBar />
      <NavigationBar
        title={{ title }}
        {...optionalAttrs}
      />
    </View>
  )
}

export default Navbar


import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'

Hamburger.propTypes = {
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  style: PropTypes.object, // optional
}

Hamburger.defaultProps = {
  size: 30,
}

function Hamburger({ onPress, size, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <Ionicons
        name='ios-menu-outline'
        size={size}
      />
    </TouchableOpacity>
  )
}

export default Hamburger


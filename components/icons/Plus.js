import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Feather } from 'react-native-vector-icons'

Plus.propTypes = {
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  style: PropTypes.object, // optional
}

Plus.defaultProps = {
  size: 30,
}

function Plus({ onPress, size, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <Feather
        name='plus'
        size={size}
      />
    </TouchableOpacity>
  )
}

export default Plus


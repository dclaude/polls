import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native'
import { facebookAppId  } from '../config'
import { login } from '../api/facebook'
import logger from '../logger'
import { colors, fontSizes } from '../styles'

class FacebookLogin extends React.Component {
  static propTypes = {
    onLogged: PropTypes.func.isRequired,
  }
  handleLoginPress = () => {
    const { onLogged } = this.props
    login(facebookAppId)
      .then(({ type, token }) => {
        if (type === 'success') {
          logger.log('Facebook login success')
          onLogged(token)
        }
        else {
          const msg = 'Facebook login canceled'
          logger.log(msg)
          Alert.alert(msg)
        }
      })
      .catch((error) => {
        const msg = `Facebook login failed ${error}`
        logger.log(msg)
        Alert.alert(msg)
      })
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleLoginPress} style={styles.touchable}>
          <Text style={styles.text}>Facebook Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  touchable: {
    // start a new flexbox for the <Text> children to be correctly centered within the <TouchableOpacity>:
    justifyContent: 'center',
    alignItems: 'center',
    //
    borderRadius: 5,
    padding: 15,
    backgroundColor: colors.facebookBlue,
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.primary,
  },
})

export default FacebookLogin


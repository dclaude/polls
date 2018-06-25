import React from 'react'
import { Text, View, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import Navbar from './Navbar'
import Hamburger from './icons/Hamburger'
import { signOut } from '../api/firebase'
import User from './User'
import { colors, fontSizes } from '../styles'

class Settings extends React.Component {
  static navigationOptions = {
    header: null, // cf comment in <Home>
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Navbar 
          title='Settings'
          leftButton={Platform.OS === 'android'
              ? <Hamburger onPress={() => navigation.toggleDrawer()} />
              : null}
        />
        <View style={styles.container}>
          <User />
          <TouchableOpacity onPress={signOut} style={styles.touchable}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    // start a new flexbox for the <Text> children to be correctly centered within the <TouchableOpacity>:
    justifyContent: 'center',
    alignItems: 'center',
    //
    borderRadius: 5,
    height: 44,
    padding: 8,
    margin: 10,
    backgroundColor: colors.facebookBlue,
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.primary,
  },
})

export default Settings


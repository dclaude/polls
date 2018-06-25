import React from 'react'
import { View, Text, Platform } from 'react-native'
import Navbar from './Navbar'
import Hamburger from './icons/Hamburger'
import Plus from './icons/Plus'
import Polls from './Polls'

class Home extends React.Component {
  static navigationOptions = {
    header: null, // do not use the headerBar of the StackNavigator because it cannot access the props/state of the rendered components (<NewPoll>, ...)
  }
  render() {
    const { navigation, items } = this.props
    // render our navigator below (i.e. only once the user is authed)
    return (
      <View style={{ flex: 1 }}>
        <Navbar 
          title='Home'
          leftButton={Platform.OS === 'android'
              ? <Hamburger onPress={() => navigation.toggleDrawer()} />
              : null}
          rightButton={<Plus onPress={() => navigation.push('NewPoll')} />}
        />
        <Polls navigation={navigation} />
      </View>
    )
  }
}

export default Home


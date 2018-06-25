import React from 'react'
import { Text, View, Platform, StyleSheet } from 'react-native'
import Navbar from './Navbar'
import Hamburger from './icons/Hamburger'
import { connect } from 'react-redux'
import Polls from './Polls'

class YourPolls extends React.Component {
  static navigationOptions = {
    header: null, // cf comment in <Home>
  }
  render() {
    const { navigation, userId } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Navbar 
          title='Your Polls'
          leftButton={Platform.OS === 'android'
              ? <Hamburger onPress={() => navigation.toggleDrawer()} />
              : null}
        />
        <View style={styles.container}>
          <Polls navigation={navigation} userId={userId} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function mapStateToProps({ authent, polls, users }) {
  const { userId } = authent
  return {
    userId,
  }
}

export default connect(mapStateToProps)(YourPolls)


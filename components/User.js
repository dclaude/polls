import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

const User = ({ user }) => {
  if (!user)
    return null
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: user.photoURL}}/>
      <Text>{user.displayName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
})

function mapStateToProps({ authent, users }) {
  const { userId } = authent
  return {
    user: users[userId] ? users[userId] : null,
  }
}

export default connect(mapStateToProps)(User)


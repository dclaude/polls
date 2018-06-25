import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import logger from '../logger'

function Poll({ poll, author, isOwner }) {
  const { title } = poll
  const count = poll.votes ? Object.keys(poll.votes).length : 0
  return (
    <View style={styles.container}>
      <View style={[ styles.leftBar, { backgroundColor: isOwner ? 'red' : 'blue' } ]} />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Image style={styles.image} source={{uri: author.photoURL}}/>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Text>{author.displayName}</Text>
          <Text>Count: {count}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
  },
  leftBar: {
    width: 5,
    marginRight: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  title: {
    marginLeft: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

function mapStateToProps({ users, authent }, { poll }) {
  const { userId } = authent
  return {
    author: users[poll.author],
    isOwner: poll.author === userId,
  }
}

export default connect(mapStateToProps)(Poll)


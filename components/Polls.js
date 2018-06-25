import React from 'react'
import PropTypes from 'prop-types'
import PollHeader from './PollHeader'
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import logger from '../logger'

class Polls extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    userId: PropTypes.string,
  }
  renderItem = ({ item }) => {
    const { navigation } = this.props
    const { poll } = item
    return (
      <TouchableOpacity
        onPress={() => navigation.push('Poll', {
          poll: poll.uid,
        })}
      >
        <PollHeader poll={poll} />
      </TouchableOpacity>
    )
  }
  render() {
    const { items, navigation } = this.props
    return (
      <FlatList
        style={styles.container}
        data={items}
        renderItem={this.renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function mapStateToProps({ polls, users }, { userId }) {
  const items = Object.values(polls)
    .filter(({ author }) => userId ? author === userId : author in users)
    .map(poll => ({
      key: poll.uid, // for <FlatList>
      poll,
    }))
  return {
    items,
  }
}

export default connect(mapStateToProps)(Polls)


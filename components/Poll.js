import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PollHeader from './PollHeader'
import { colors } from '../styles'
import { connect } from 'react-redux'
import { handlePollVote } from '../reducers/polls'

class Poll extends React.Component {
  static propTypes = {
    voted: PropTypes.bool.isRequired,
  }
  static navigationOptions = {
    title: 'All Polls',
  }
  handleOptionPress = (index) => {
    const { dispatch, poll } = this.props
    dispatch(handlePollVote(poll.uid, index))
  }
  render() {
    const { poll } = this.props
    const { voted, votes } = this.props
    return (
      <View style={styles.container}>
        <PollHeader poll={poll} />
        <View style={styles.separator} />
        {poll.options.map((option, index) => (
          <View key={index} style={styles.option}>
            {voted &&
              <View style={[ { flex: 1 }, styles.vote ]}>
                <Text>{votes[index]} %</Text>
              </View>
            }
            <View style={{ flex: 4 }}>
              <TouchableOpacity
                style={styles.touchable}
                disabled={voted}
                onPress={() => this.handleOptionPress(index)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  separator: {
    height: 20,
  },
  option: {
    flexDirection: 'row',
  },
  vote: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  touchable: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    height: 44,
    padding: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
})

function mapStateToProps({ authent, polls }, { navigation }) {
  const { userId } = authent
  const pollId = navigation.getParam('poll')
  const poll = polls[pollId]
  const voteValues = poll.votes ? Object.values(poll.votes) : []
  const votes = voteValues.reduce((acc, optionIndex) => {
    acc[optionIndex] += 1
    return acc
  }, new Array(poll.options.length).fill(0))
    .map(item => item / voteValues.length * 100)
  return {
    poll,
    voted: poll.votes && userId in poll.votes ? true : false,
    votes,
  }
}

export default connect(mapStateToProps)(Poll)


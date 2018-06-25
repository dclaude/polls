import React from 'react'
import { Platform, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import Navbar from './Navbar'
import { handlePollAdd } from '../reducers/polls'
import { connect } from 'react-redux'
import { colors, fontSizes } from '../styles'
import logger from '../logger'

class NewPoll extends React.Component {
  static navigationOptions = {
    header: null, // cf comment in <Home>
  }
  state = {
    title: '',
    options: [ '' ],
  }
  handleTitleChangeText = (title) => {
    this.setState(() => ({ title }))
  }
  handleOptionChangeText = (option, index) => {
    this.setState((prevState) => {
      const options = [ ...prevState.options ]
      options[index] = option
      return {
        options,
      }
    })
  }
  handleNewOptionPress = () => {
    this.setState((prevState) => ({
      options: [ ...prevState.options, '' ],
    }))
  }
  handleClosePress = () => {
    const { navigation } = this.props
    navigation.pop()
  }
  handleSubmitPress = () => {
    const { title, options } = this.state
    const { dispatch, navigation, pollTitles } = this.props
    const optMessages = options.map((option, index) => !option ? `Option ${index + 1}` : '')
      .filter(msg => msg ? true : false)
    let msg = ''
    if (!title || pollTitles.includes(title)) {
      msg += 'Title\n'
    }
    if (optMessages.length) {
      msg += optMessages.join('\n')
    }
    if (msg) {
      Alert.alert(`Invalid fields:\n${msg}`)
      return
    }
    //
    dispatch(handlePollAdd(title, options))
      .then(() => navigation.pop())
  }
  textInputStyle = () => {
    return [ styles.input, Platform.OS === 'ios' ? styles.inputIos : {} ]
  }
  render() {
    const { title, options } = this.state
    logger.log(Platform.OS)
    return (
      <View style={{ flex: 1 }}>
        <Navbar 
          title='New Poll'
          leftButton={
            <TouchableOpacity onPress={this.handleClosePress}>
              <Text>Close</Text>
            </TouchableOpacity>
          }
          rightButton={
            <TouchableOpacity onPress={this.handleSubmitPress}>
              <Text>Submit</Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.container}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={this.textInputStyle()}
            value={title}
            placeholder='Poll Title'
            onChangeText={this.handleTitleChangeText}
          />
          <Text style={styles.label}>Options:</Text>
          {options.map((option, index) => (
            <TextInput
              key={index}
              style={this.textInputStyle()}
              value={option}
              placeholder='Option'
              onChangeText={(text) => this.handleOptionChangeText(text, index)}
            />
          ))}
          {(options.length < 4) &&
            <TouchableOpacity onPress={this.handleNewOptionPress} style={styles.touchable}>
              <Text style={styles.text}>New Option</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // the values below are the default with react-native: 
    /*
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    */
  },
  input: {
    height: 44,
    padding: 8,
    marginTop: 5,
  },
  inputIos: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
  },
  label: {
    marginTop: 10,
    fontSize: fontSizes.primary,
  },
  touchable: {
    alignSelf: 'center', // in react-native the default alignItems is 'stretched' so we override it with center
    //
    // then start a new flexbox for the <Text> children to be correctly centered within the <TouchableOpacity>:
    justifyContent: 'center',
    alignItems: 'center',
    //
    width: 150,
    borderRadius: 5,
    height: 44,
    padding: 8,
    marginTop: 10,
    backgroundColor: colors.blue,
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.primary,
  },
})

function mapStateToProps({ polls }) {
  const pollTitles = Object.values(polls).map(poll => poll.title)
  return {
    pollTitles,
  }
}

export default connect(mapStateToProps)(NewPoll)


import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { DrawerItems } from 'react-navigation'
import StatusBar from './StatusBar'
import User from './User'

const Drawer = (props) => {
  const { user } = props
  return (
    <ScrollView>
      <StatusBar />
      <User />
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Drawer


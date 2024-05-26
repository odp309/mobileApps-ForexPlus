import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RiwayatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>RiwayatScreen</Text>
    </View>
  )
}

export default RiwayatScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
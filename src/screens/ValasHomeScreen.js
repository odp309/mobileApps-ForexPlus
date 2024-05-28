import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ValasHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ValasHomeScreen</Text>
    </View>
  )
}

export default ValasHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    marginTop: "7%", 
  },
})
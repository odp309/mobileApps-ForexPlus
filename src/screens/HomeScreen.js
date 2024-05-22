import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BodyRegularText } from '../components/shared/StyledText' 

const HomeScreen = () => {
   
  return (
    <View style={styles.container}>
      <BodyRegularText>HomeScreen</BodyRegularText>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
})
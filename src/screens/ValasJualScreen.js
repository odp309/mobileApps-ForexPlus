import {StyleSheet, View } from 'react-native'
import React from 'react'
import { BodyRegularText } from '../components/shared/StyledText' 
import colors from '../theme/colors'
import CurrentSaldo from '../components/valasJual/CurrentSaldo'

const ValasJualScreen = () => {
   
  return (
    <View style={styles.container}>
        <CurrentSaldo />
    </View>
  )
}

export default ValasJualScreen;

const styles = StyleSheet.create({
  container : {
    flex:1,
    paddingTop: 36,
    paddingHorizontal:20,
    backgroundColor: colors.color.white
}
})
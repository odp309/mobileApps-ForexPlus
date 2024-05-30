import {StyleSheet, View } from 'react-native'
import React from 'react'
import { BodyLargeText, BodyRegularText, HeadingSixText } from '../shared/StyledText';
import colors from '../../theme/colors';
// import { BodyRegularText } from '../components/shared/StyledText' 

const CurrentSaldo = () => {
   
  return (
    <View style={styles.container}>
      <BodyLargeText style={{color:colors.secondary.secondaryOne, fontWeight: 'bold'}}>Saldo Anda</BodyLargeText>
      <HeadingSixText style={{color:colors.primary.primaryOne, fontWeight: 'bold'}}>SGD 11.979,00</HeadingSixText>
    </View>
  )
}

export default CurrentSaldo;

const styles = StyleSheet.create({
  container : {
    width: '100%',
    justifyContent:'flex-start',
    alignItems:'flex-start',
}
})
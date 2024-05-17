import { StyleSheet,TextInput} from 'react-native'
import React from 'react'
import colors from '../../theme/colors'

const Input = ({placeholder}) => {
  return (
    <TextInput style={styles.textInputStyle} placeholder={placeholder} />
  )
}

export default Input

const styles = StyleSheet.create({
  textInputStyle : {
    width:'100%',
    borderWidth:1,
    borderColor: colors.color.primary,
    paddingHorizontal:'5%',
    paddingVertical:'4%',
    borderRadius:10,
    fontSize:16
  }
})
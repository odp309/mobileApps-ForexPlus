import { StyleSheet, Text, View } from 'react-native' 
import React from 'react'
import { Button } from '@rneui/themed'
import colors from '../../theme/colors'


const StyledButton = ({mode,title,onPress}) => { 
  return ( 
    mode === "primary" ? (
    <Button 
      title={title} 
      radius='lg' 
      size='lg' 
      buttonStyle = {styles.bgPrimary}
      titleStyle ={{fontSize:20}}
      onPress={onPress}
      containerStyle={{width:'100%'}}
    /> 
    )
    :
    mode === "secondary" ? (
    <Button
      title={title} 
      radius={'lg'} 
      size='lg' 
      buttonStyle = {styles.bgSecondary}
      containerStyle={{width:'100%'}}
    /> 
    )

    :
    mode === "primary-outlined" ? (
    <Button 
      title={title} 
      type='outline' 
      radius={'lg'} 
      size='lg' 
      buttonStyle = {styles.borderPrimary}
      titleStyle = {styles.labelPrimary}
      containerStyle={{width:'100%'}}
    /> 
    )
    :
    mode === "secondary-outlined" ? (
    <Button 
      title={title} 
      type='outline' 
      radius={'lg'} 
      size='lg' 
      buttonStyle ={styles.borderSecondary} 
      containerStyle={{width:'100%'}}
    />
    )
    : (
      <Text>Mode :{title}</Text>
    )
  )
}

export default StyledButton

const styles = StyleSheet.create({

    bgPrimary: {
      backgroundColor : colors.color.primary
    },
    bgSecondary: {
      backgroundColor : colors.color.secondary
    }, 


    borderPrimary : {
      borderColor : colors.color.primary,
    },
    borderSecondary : {
      borderColor : colors.color.secondary,
    },


    bgPrimarydDisabled : {
      backgroundColor : colors.color.primary_disabled
    },
    bgSecondarydDisabled : {
      backgroundColor : colors.color.secondary_disabled
    },

    labelPrimary: {
      color:colors.color.primary,
    },
    labelSecondary : {
      color : colors.color.secondary,
    },
    
})
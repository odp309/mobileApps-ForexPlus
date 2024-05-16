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
      onPress={onPress}
    /> 
    )
    :
    mode === "secondary" ? (
    <Button 
      title={title} 
      radius={'lg'} 
      size='lg' 
      buttonStyle = {styles.bgSecondary}
    /> 
    )

    :
    mode === "primary-outlined" ? (
    <Button 
      title={title} 
      type='outline' 
      radius={'lg'} 
      size='lg' 
      buttonStyle = {styles.bgPrimaryOutlined}
      titleStyle = {styles.labelPrimary}
    /> 
    )
    :
    mode === "secondary-outlined" ? (
    <Button 
      title={title} 
      type='outline' 
      radius={'lg'} 
      size='lg' 
      buttonStyle ={styles}
      
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


    bgPrimaryOutlined : {
      borderColor : colors.color.primary,
    },
    bgSecondaryOutlined : {
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
    }
})
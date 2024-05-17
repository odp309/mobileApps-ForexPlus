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
    : 
    mode === "primary-disabled" ? (
    <Button 
      title={title} 
      type='outline' 
      radius={'lg'} 
      size='lg' 
      buttonStyle = {styles.bgPrimarydDisabled}
      titleStyle = {styles.labelDisabled}
    /> 
    )
    :
    mode === "secondary-disabled" ? (
    <Button 
      title={title} 
      type='outline' 
      radius={'lg'} 
      size='lg' 
      buttonStyle ={styles.bgSecondarydDisabled}
      titleStyle = {styles.labelDisabled}
      
    />
    )
    : 
    (
      <Text>Mode :{title}</Text>
    )
  )
}

export default StyledButton

const styles = StyleSheet.create({

    bgPrimary: {
      backgroundColor : colors.primary.primaryOne
    },
    bgSecondary: {
      backgroundColor : colors.secondary.secondaryOne
    }, 


    bgPrimaryOutlined : {
      borderColor : colors.primary.primaryOne
    },
    bgSecondaryOutlined : {
      borderColor : colors.secondary.secondaryOne
    },


    bgPrimarydDisabled : {
      backgroundColor : colors.primary.primaryThree
    },
    bgSecondarydDisabled : {
      backgroundColor : colors.secondary.secondaryThree
    },

    labelPrimary: {
      color:colors.primary.primaryOne
    },
    labelSecondary : {
      color : colors.secondary.secondaryOne
    },
    labelDisabled:{
      color:colors.color.white
    }
})
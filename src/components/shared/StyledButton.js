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
    borderPrimary:{
      borderColor:  colors.primary.primaryOne,
      borderWidth: 2
    },
    borderSecondary:{
      borderColor:  colors.secondary.secondaryOne,
      borderWidth: 2
    },
    bgPrimarydDisabled : {
      backgroundColor : colors.primary.primaryTwo
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
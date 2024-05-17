import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyledButton from '../../components/shared/StyledButton'
import colors from '../../theme/colors'
import Input from '../../components/shared/Input'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

      </View>
      <View style={styles.bottomContainer}>

        <Input placeholder="Username" />
        <Input placeholder="Password" />

        <StyledButton mode="primary" title="Login" onPress={() => navigation.navigate("HomeScreen")}/>
      </View>
      
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer :{
    backgroundColor: colors.color.primary,
    flex: 0.6,
    padding:'5%',
    width:'100%'
  },
  bottomContainer: {
    flex:0.4,
    justifyContent:'space-evenly',
    padding:'5%',
    borderColor: colors.color.primary,
    borderWidth:1,
    width:'100%'
  }
})
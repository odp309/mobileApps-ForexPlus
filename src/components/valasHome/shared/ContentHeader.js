import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from '../../shared/BackButton'
import { BodyXLTextSemiBold } from '../../shared/StyledText'
import colors from '../../../theme/colors'
import { useNavigation } from '@react-navigation/native'

const ContentHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BackButton
          style={{ width: 50 }}
          onPress={() => navigation.goBack()}
          color={colors.color.black}
        />
        <BodyXLTextSemiBold style={{ textAlign: "center" }}>
          {title}
        </BodyXLTextSemiBold>
    </View>
  )
}

export default ContentHeader

const styles = StyleSheet.create({
    container: {
        width: "100%",  
      },
})
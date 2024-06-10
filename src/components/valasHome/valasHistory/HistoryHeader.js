import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import BackButton from "../../shared/BackButton";
import { BodyXLTextSemiBold } from "../../shared/StyledText";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HistoryHeader = ({ title, ignoreBackButton, hasConfirmation }) => {
  const navigation = useNavigation();

  const handleOptionsPress = () => {
    
    console.log('Options icon pressed');
   
    navigation.navigate('SettingsScreen');
  };

  const handleDownloadPress = () => {
    
    console.log('Download icon pressed');
    
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ flex: 1 }}>
          {!ignoreBackButton && (
            <BackButton
              hasConfirmation={hasConfirmation}
              style={{ width: 50 }}
              onPress={() => navigation.goBack()}
              color={colors.color.black}
            />
          )}
        </View>
        <BodyXLTextSemiBold style={styles.title}>{title}</BodyXLTextSemiBold>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleOptionsPress}>
          <Ionicons
            name="options"
            size={28}
            style={styles.icon}
            color={colors.primary.primaryOne} 
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDownloadPress}>
          <MaterialIcons
            name="download"
            size={28}
            color={colors.primary.primaryOne}
          />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HistoryHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    flex: 1,
    textAlign: "center",  
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  icon: {
    marginHorizontal: 10, // Adds some space between the icons
  },
});
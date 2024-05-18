import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import StyledButton from "../../components/shared/StyledButton";
import colors from "../../theme/colors";
import Input from "../../components/shared/Input";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/bg_login.png")}
    >
      <View style={styles.topContainer}>
        <Image
          style={{ width: "40%", marginBottom: "20%" }}
          resizeMode="contain"
          source={require("../../../assets/icon_bni.png")}
        />
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          mode="primary"
          title="Login"
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          contentContainerStyle={styles.scrollViewStyle}
        >
          <View style={styles.contentStyle}>
            <Image
              style={styles.shortcutImage}
              source={require("../../../assets/e-wallet.png")}
            />
            <Text style={{fontSize:14,marginTop:5}}>E-Wallet</Text>
          </View>
          <View style={styles.contentStyle}>
            <Image
              style={styles.shortcutImage}
              source={require("../../../assets/qris.png")}
            />
            <Text style={{fontSize:14,marginTop:5}}>QRIS</Text>
          </View>
          <View style={styles.contentStyle}>
            <Image
              style={styles.shortcutImage}
              source={require("../../../assets/menu-lain.png")}
            />
            <Text style={{fontSize:14,marginTop:5}}>Menu Lain</Text>
          </View>
        </ScrollView>

        <View style={{ alignItems: "center", marginBottom: "20%" }}>
          <Text>Version 5.0.0.1</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    // backgroundColor: colors.color.primary,
    flex: 0.6,
    paddingVertical: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    flex: 0.4,
    justifyContent: "space-evenly",
    paddingHorizontal: "10%",
    // borderColor: colors.color.primary,
    // borderWidth:1,
    width: "100%",
  },
  shortcutImage: {
    width: 60,
    height: 60,
  },
  scrollViewStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: "10%",
    
  },
  contentStyle: {
    alignItems:'center'
  }
});

import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import StyledButton from "../../components/shared/StyledButton";
import { useNavigation } from "@react-navigation/native";
import {
  BodyRegularText,
  BodySmallText,
  HeadingFiveText,
} from "../../components/shared/StyledText";
import Input from "../../components/shared/Input";
import { cleanupToken, login } from "../../config/AuthConfig";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("arfiandiw62@gmail.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    cleanupToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../../assets/bg-login.png")}
      >
        <View style={styles.topContainer}>
          <Image
            style={{ width: "40%", marginBottom: "20%" }}
            resizeMode="contain"
            source={require("../../../assets/icon-bni.png")}
          />
        </View>
        <View style={styles.bottomContainer}>
          <StyledButton
            mode="primary"
            title="Login"
            size={"lg"}
            onPress={() => setModalVisible(true)}
          />
          <ScrollView
            horizontal={true}
            scrollEnabled={false}
            contentContainerStyle={styles.scrollViewStyle}
          >
            <View style={styles.contentStyle}>
              <Image
                style={styles.shortcutImage}
                source={require("../../../assets/icon-e-wallet.png")}
              />
              <BodySmallText style={{ marginTop: 5 }}>E-Wallet</BodySmallText>
            </View>
            <View style={styles.contentStyle}>
              <Image
                style={styles.shortcutImage}
                source={require("../../../assets/icon-qris.png")}
              />
              <BodySmallText style={{ marginTop: 5 }}>QRIS</BodySmallText>
            </View>
            <View style={styles.contentStyle}>
              <Image
                style={styles.shortcutImage}
                source={require("../../../assets/icon-menu-lain.png")}
              />
              <BodySmallText style={{ marginTop: 5 }}>Menu Lain</BodySmallText>
            </View>
          </ScrollView>

          <View style={{ alignItems: "center", marginBottom: "15%" }}>
            <BodySmallText>Version 5.12.0</BodySmallText>
          </View>
        </View>
      </ImageBackground>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={styles.modalView}>
            <Image
              style={{ width: "35%", marginVertical: "5%" }}
              resizeMode="contain"
              source={require("../../../assets/icon-bni.png")}
            />
            <Input
              mode={"active"}
              value={email}
              placeholder={"Email"}
              onChangeText={setEmail}
            />
            <Input
              mode={"active"}
              value={password}
              placeholder={"password"}
              onChangeText={setPassword}
            />
            <StyledButton
              mode={"primary"}
              title={"Login"}
              size={"lg"}
              onPress={() =>
                login(
                  email,
                  password,
                  setModalVisible,
                  modalVisible,
                  navigation
                )
              }
              style={{ marginVertical: "5%" }}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: screenHeight,
  },
  topContainer: { 
    height: screenHeight * 0.6,
    paddingVertical: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    height: screenHeight * 0.4,
    justifyContent: "space-evenly",
    paddingHorizontal: "10%", 
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
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    margin: "8%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

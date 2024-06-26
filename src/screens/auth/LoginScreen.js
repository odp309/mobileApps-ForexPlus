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
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import StyledButton from "../../components/shared/StyledButton";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BodySmallText } from "../../components/shared/StyledText";
import Input from "../../components/shared/Input";
import {
  JwtDecoder,
  checkTokenAvailibility,
  cleanupToken,
  login,
  logout, 
  userData,
} from "../../config/AuthConfig";
import colors from "../../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const screenHeight = Dimensions.get("window").height * 1.05;
const screenWidth = Dimensions.get("screen").width;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(screenHeight))[0];
  const [isLoading, setIsLoading] = useState(false);
  const [wrongValidation, setWrongValidation] = useState(false); 

  useEffect(() => {
    cleanupToken();
  }, []);
 
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const fetchLogin = await login(email, password,navigation);
      await handleSuccessfulLogin(fetchLogin);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = async (fetchLogin) => {
    console.log(fetchLogin.data);
    if (userData) {
      setModalVisible(!modalVisible);
      navigation.navigate("HomePage");
    }

  };

  const handleLoginError = (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      setWrongValidation(true);
      setTimeout(() => {
        setWrongValidation(false);
      }, 5000);
    } else {
      Alert.alert("Network Error", "Check your connection");
    }
  };

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="dark"
        translucent={true}
        backgroundColor="transparent"
      />
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/bg-login.png')}
      >
        <View style={styles.topContainer}>
          <Image
            style={{ width: "40%", height: 50, marginBottom: 20 }}
            resizeMode="contain"
            source={require('../../../assets/icon-bni.png')}
          />
        </View>
        <View style={styles.bottomContainer}>
          <StyledButton
            mode="primary-gradient"
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
                source={require('../../../assets/icon-qris.png')}
              />
              <BodySmallText style={{ marginTop: 5 }}>QRIS</BodySmallText>
            </View>
            <View style={styles.contentStyle}>
              <Image
                style={styles.shortcutImage}
                source={require('../../../assets/icon-e-wallet.png')}
              />
              <BodySmallText style={{ marginTop: 5 }}>E-Wallet</BodySmallText>
            </View>
            <View style={styles.contentStyle}>
              <Image
                style={styles.shortcutImage}
                source={require('../../../assets/icon-menu-lain.png')}
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
        animationType="none"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {wrongValidation && (
          <View style={styles.accountCheckerContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              style={{ marginTop: 1, marginRight: 4 }}
              color={"white"}
            ></Ionicons>
            <BodySmallText style={{ color: "white" }}>
              Username dan password yang Anda masukkan salah. Silakan coba
              kembali.
            </BodySmallText>
          </View>
        )}
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <TouchableOpacity
            style={styles.backgroundOverlay}
            onPress={() => setModalVisible(false)}
          />
          <Animated.View
            style={[
              styles.modalView,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Image
              style={{ width: "35%", marginVertical: "5%" }}
              resizeMode="contain"
              source={require("../../../assets/icon-bni.png")}
            />
            <Input
              mode={"active"}
              iconColor={
                email === ""
                  ? colors.primary.primaryTwo
                  : colors.primary.primaryOne
              }
              value={email}
              hasLeftIcon={true}
              leftIconName={"person-outline"}
              placeholder={"Email"}
              onChangeText={setEmail}
              style={{ paddingLeft: 50 }}
            />
            <Input
              mode={"active"}
              iconColor={
                password === ""
                  ? colors.primary.primaryTwo
                  : colors.primary.primaryOne
              }
              value={password}
              hasLeftIcon={true}
              hasRightIcon={true}
              secureTextEntry={!passwordVisible}
              leftIconName={"lock-outline"}
              rightIconName={passwordVisible ? "eye" : "eye-off"}
              placeholder={"Password"}
              onChangeText={setPassword}
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{ paddingLeft: 50, paddingRight: 50 }}
              rightIconStyle={{ position: "absolute", marginLeft: "87%" }}
            />

            {isLoading ? (
              <StyledButton
                mode={"primary-disabled"}
                title={"Loading"}
                size={"lg"}
                style={{ marginVertical: "5%" }}
              />
            ) : (
              <StyledButton
                mode={"primary-gradient"}
                title={"Login"}
                size={"lg"}
                onPress={() => handleLogin()}
                style={{ marginVertical: "5%" }}
              />
            )}
          </Animated.View>
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
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
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
  accountCheckerContainer: {
    width: "90%",
    borderRadius: 10,
    minHeight: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 50,
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "red",
    alignSelf: "center",
  },
});

import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  BodyLargeTextSemiBold,
  BodyMediumTextSemiBold,
  BodySmallText,
  BodyXLTextBold,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import Input from "../../../components/shared/Input";
import StyledButton from "../../../components/shared/StyledButton";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  alertConfirmation,
  findBankAccountInfo,
} from "../../../config/ValasConfig";

const dataRekening = [
  { id: "1", noRek: "123456789", nama: "Arfiandi Wijatmiko" },
  { id: "2", noRek: "191919191", nama: "Muhammad Daffa F.A" },
  { id: "3", noRek: "131313131", nama: "Farrel haridhi" },
];

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const CheckTargetAccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentCurrencyCode = route.params?.selectedWallet.currencyCode;
  const currentRekening = route.params?.selectedRekening;
  const currentWallet = route.params?.selectedWallet;
  const currentCurrency = route.params?.selectedCurrency;

  const [inputRekening, setInputRekening] = useState("");
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [accountCheckStatus, setAccountCheckStatus] = useState("loading");
  const [messageStatus, setMessageStatus] = useState("");
  const [accountFind, setAccountFind] = useState(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isLoading,setIsLoading]= useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  const findNoRek = async (currentRek, noRek, currencyCode) => {
    const hasil = await findBankAccountInfo(currentRek, noRek, currencyCode);
    return hasil;
  };

  const handleFindNoRek = async () => {
    setHasChecked(true);
    setMessageStatus("Mengecek Nomor rekening tujuan...");
    setAccountCheckStatus("loading");
    setIsCheckingAccount(true);
    setButtonVisible(false);

    try {
      const findResult = await findNoRek(
        currentRekening.accountNumber,
        inputRekening,
        currentCurrencyCode
      );
      console.log(findResult);
      if (findResult) {
        setAccountFind(findResult);
        setMessageStatus("Berhasil Menemukan");
        setAccountCheckStatus("success");
        animateCardAccount();
        setButtonVisible(false);
      } else {
        setMessageStatus(
          "Nomor rekening tidak valid / rekening tidak memiliki wallet valas tujuan. \nPastikan nomor rekening yang dimasukkan sudah benar."
        );
        setAccountCheckStatus("fail");
        setAccountFind(null);
        setButtonVisible(true);
      }
    } catch (error) {
      console.error(error);
      setMessageStatus("Terjadi kesalahan, coba lagi.");
      setAccountCheckStatus("fail");
      setAccountFind(null);
      setButtonVisible(true);
    }
    setIsCheckingAccount(false);
  };

  const animateCardAccount = () => {
    fadeAnim.setValue(0);
    translateYAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (accountFind) {
      const timer = setTimeout(() => {
        navigation.navigate("EnterTransfer", {
          accountFind,
          currentWallet,
          currentRekening,
          currentCurrency,
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [accountFind, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      alertConfirmation(navigation)
    );
    return () => backHandler.remove();
  }, []);


  useEffect(()=>{
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },300) 
  },[])
  useFocusEffect(
    useCallback(() => {
      setHasChecked(false);
      setAccountCheckStatus("loading");
      setMessageStatus("");
      setAccountFind(null);
      setButtonVisible(true);
    }, [])
  );

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Transfer Valas"} hasConfirmation={true} />
      </View>

      <View style={styles.middleContainer}>
        <View style={{ marginLeft: "2%", marginVertical: "2%" }}>
          <BodyXLTextBold style={{ color: colors.primary.primaryOne }}>
            Cek Rekening Tujuan
          </BodyXLTextBold>
          <BodySmallText style={{ fontSize: 16, marginTop: 5 }}>
            Silahkan masukkan dan periksa{"\n"}nomor rekening tujuan anda
            dibawah ini.
          </BodySmallText>
        </View>
        <Input
          mode={"active"}
          value={inputRekening}
          hasRightIcon={!!inputRekening}
          keyboardType="numeric"
          rightIconName={"close-circle"}
          onChangeText={setInputRekening}
          placeholder={"Masukkan nomor rekening"}
          iconColor={colors.color.lightGrey}
          onPress={() => setInputRekening("")}
          rightIconStyle={{position: "absolute", marginLeft: "89%"}}
        />

        {hasChecked && (
          <View
            style={[
              styles.accountCheckerContainer,
              {
                backgroundColor:
                  accountCheckStatus === "loading"
                    ? "lightgrey"
                    : accountCheckStatus === "fail"
                    ? colors.color.errorTransparent
                    : colors.color.successTransparent,
              },
            ]}
          >
            {isCheckingAccount ? (
              <ActivityIndicator
                style={{ marginRight: 10 }}
                size="small"
                color="grey"
              />
            ) : (
              <Ionicons
                name={
                  accountCheckStatus === "success"
                    ? "checkmark-circle-outline"
                    : "alert-circle-outline"
                }
                size={16}
                style={{ marginTop: 1, marginRight: 5 }}
                color={accountCheckStatus === "success" ? "green" : "red"}
              />
            )}

            <BodySmallText
              style={{
                color:
                  accountCheckStatus === "loading"
                    ? "black"
                    : accountCheckStatus === "fail"
                    ? "red"
                    : "green",
              }}
            >
              {messageStatus}
            </BodySmallText>
          </View>
        )}
        {accountFind && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            }}
          >
            <ImageBackground
              resizeMode="stretch"
              source={{ uri: "https://i.imgur.com/qcbAgDD.png" }}
              style={styles.cardContainer}
            >
              <View>
                <Image
                  source={{ uri: "https://i.imgur.com/o1jPFSo.png" }}
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <View style={{ marginLeft: 15, justifyContent: "center" }}>
                <BodyMediumTextSemiBold
                  style={{ color: colors.primary.primaryOne, fontSize: 18 }}
                >
                  Dompet Valas {currentCurrencyCode}
                </BodyMediumTextSemiBold>
                <BodyLargeTextSemiBold
                  style={{ color: colors.primary.primaryOne, fontSize: 20 }}
                >
                  {accountFind.firstName + " " + accountFind.lastName}
                </BodyLargeTextSemiBold>
              </View>
            </ImageBackground>
          </Animated.View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        {buttonVisible && (
          <StyledButton
            title={"Periksa"}
            size={"lg"}
            mode={inputRekening === "" ? "primary-disabled" : "primary"}
            onPress={handleFindNoRek}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CheckTargetAccountScreen;

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "12%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  accountCheckerContainer: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    flexDirection: "row",
  },
  cardContainer: {
    minHeight: 50,
    borderRadius: 20,
    padding: 20,
    paddingVertical: 40,
    marginTop: 30,
    flexDirection: "row",
  },
});

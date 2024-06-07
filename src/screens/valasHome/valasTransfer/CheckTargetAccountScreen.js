import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { 
  BodyMediumTextSemiBold,
  BodySmallText, 
  BodyXLTextBold, 
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import Input from "../../../components/shared/Input";
import StyledButton from "../../../components/shared/StyledButton";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../components/shared/BackButton"; 
import { Ionicons } from "@expo/vector-icons";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";

const CheckTargetAccountScreen = () => {
  const dataRekening = [
    { id: "1", noRek: "123456789", nama: "Arfiandi Wijatmiko" },
    { id: "2", noRek: "191919191", nama: "Muhammad Daffa F.A" },
    { id: "3", noRek: "131313131", nama: "Farrel haridhi" },
  ];
  const navigation = useNavigation();
  const [inputRekening, setInputRekening] = useState("");
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [accountCheckStatus, setAccountCheckStatus] = useState("loading");
  const [messageStatus, setMessageStatus] = useState("");
  const [accountFind, setAccountFind] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  const findNoRek = (noRek) => {
    return dataRekening.find((item) => item.noRek === noRek);
  };

  const handleFindNoRek = () => {
    setHasChecked(true);
    setMessageStatus("Mengecek Nomor rekening tujuan...");
    setAccountCheckStatus("loading");
    setIsCheckingAccount(true);

    setTimeout(() => {
      const findResult = findNoRek(inputRekening);
      if (findResult) {
        setAccountFind(findResult);
        setMessageStatus("Berhasil Menemukan");
        setAccountCheckStatus("success");
        animatedCardAccount();
      } else {
        setMessageStatus(
          "Nomor rekening tidak valid / rekening tidak memiliki wallet valas tujuan. \nPastikan nomor rekening yang dimasukkan sudah benar."
        );
        setAccountCheckStatus("fail");
        setAccountFind(null);
      }
      setIsCheckingAccount(false);
    }, 500);
  };

  const animatedCardAccount = () => {
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
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Transfer Valas"} />
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
          hasLeftIcon={true}
          keyboardType="numeric"
          leftIconName={""}
          onChangeText={setInputRekening}
          placeholder={"Masukkan nomor rekening"}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("EnterTransfer",{data:accountFind})}
            >
              <View
                style={{
                  minHeight: 50,
                  width: "100%",
                  backgroundColor: colors.color.successTransparent,
                  borderRadius: 20,
                  padding: 20,
                  paddingVertical: 40,
                  marginTop: 30,
                  flexDirection: "row",
                }}
              >
                <View>
                  <Image
                    source={require("../../../../assets/icon-user-he.png")}
                    style={{ width: 70, height: 70 }}
                  />
                </View>
                <View style={{ marginLeft: 15, justifyContent: "center" }}>
                  <BodyMediumTextSemiBold>
                    {accountFind.nama}
                  </BodyMediumTextSemiBold>
                  <BodySmallText>{accountFind.noRek}</BodySmallText>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          title={"Periksa"}
          size={"lg"}
          mode={inputRekening === "" ? "primary-disabled" : "primary"}
          onPress={() => handleFindNoRek()}
        />
      </View>
    </View>
  );
};

export default CheckTargetAccountScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1, 
    marginTop: "15%",
    paddingHorizontal:20
  },
  middleContainer: {
    width: "100%",
    flex: 0.75, 
    paddingHorizontal:20
  },
  bottomContainer: { 
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal:20
  },
  accountCheckerContainer: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    flexDirection: "row",
  },
});

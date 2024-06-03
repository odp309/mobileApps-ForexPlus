import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  BodyMediumText,
  BodySmallText,
  BodyXLTextBold,
  BodyXLTextSemiBold,
} from "../../components/shared/StyledText";
import colors from "../../theme/colors";
import Input from "../../components/shared/Input";
import StyledButton from "../../components/shared/StyledButton";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/shared/BackButton";
import { fetchSaldo } from "../../config/ValasConfig";
const TransferValasScreen = () => {
  const dataRekening = [
    { id: "1", noRek: "12345", nama: "Arfiandi Wijatmiko" },
    { id: "2", noRek: "14122", nama: "Mikiimim" },
    { id: "3", noRek: "14312", nama: "Es teh" },
  ];
  const navigation = useNavigation();
  const [inputRekening, setInputRekening] = useState("");
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [accountCheckStatus, setAccountCheckStatus] = useState("loading");
  const [messageStatus, setMessageStatus] = useState("");

  const findNoRek = (noRek) => {
    return dataRekening.find((item) => item.noRek === noRek);
  };

  const handleFindNoRek = () => {
    setHasChecked(true);

    setTimeout(() => {
      const findResult = findNoRek(inputRekening);
      if (findResult) {
        setMessageStatus("Berhasil Menemukan");
        setAccountCheckStatus("success");
      } else {
        setMessageStatus(
          "Nomor rekening tidak valid / rekening tidak memiliki wallet valas tujuan. \nPastikan nomor rekening yang dimasukkan sudah benar."
        );
        setAccountCheckStatus("fail");
      }
      setIsCheckingAccount(false);
    }, 500);
    setMessageStatus("Mengecek Nomor rekening tujuan...");
    setAccountCheckStatus("loading");
    setIsCheckingAccount(true);
  };

  return (
    <View style={styles.container}>
      <BackButton
        style={{ width: 50 }}
        onPress={() => navigation.goBack()}
        color={colors.color.black}
      />
      <View style={styles.topContainer}>
        <BodyXLTextSemiBold style={{ textAlign: "center" }}>
          Transfer Valas
        </BodyXLTextSemiBold>
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
            {isCheckingAccount && (
              <ActivityIndicator
                style={{ marginRight: 10 }}
                size="small"
                color="grey"
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

export default TransferValasScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingTop: "15%",
    padding: "5%",
  },
  topContainer: {
    width: "100%",
    flex: 0.05,
  },
  middleContainer: {
    width: "100%",
    marginTop: 20,
    flex: 0.45,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "flex-end",
    flex: 0.5,
    marginBottom: 20,
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

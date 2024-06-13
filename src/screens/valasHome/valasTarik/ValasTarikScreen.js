import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  BodyXLTextBold,
  BodySmallText,
  BodySmallTextSemiBold,
  BodyLargeText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputCurrency from "../../../components/valasHome/shared/InputCurrency";
import WalletValasSource from "../../../components/valasHome/shared/WalletValasSource";
import StyledButton from "../../../components/shared/StyledButton";
import * as Location from "expo-location";
import { fetchRelatedBranch } from "../../../config/ValasConfig";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const ValasTarikScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedRekening, selectedWallet, selectedCurrency } = route.params;

  const [transactionData, setTransactionData] = useState({
    selectedWallet: selectedWallet,
    selectedRekening: selectedRekening,
    selectedCurrency: selectedCurrency,
    inputValue: "",
  });

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
      console.log(location);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onContinue = async () => {
    try {
      const getBranch = await fetchRelatedBranch(
        location.coords.latitude,
        location.coords.longitude,
        transactionData.inputValue,
        transactionData.selectedWallet.currencyCode
      );
      if (getBranch) {
        console.log(getBranch);
        navigation.navigate("ChooseBranch", { transactionData, getBranch });
      }
    } catch (error) {}
  };

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    // console.log(selectedRekening);
    // console.log(selectedWallet);
    // console.log(selectedCurrency);
    getLocation();
  }, []);

  function onChangeText(e) {
    setErrorText("");
    setTransactionData((prevData) => ({
      ...prevData,
      inputValue: e,
    }));
    if (e === "") {
      return;
    }
    if (parseInt(e) > selectedWallet.balance) {
      setErrorText("Saldo Anda tidak mencukupi");
      return;
    }
    if (parseInt(e) % 100 !== 0) {
      setErrorText("Nominal penarikan harus dalam kelipatan 100");
      return;
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }
  return (
    location && (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ContentHeader title={"Tarik Valas"} hasConfirmation={true} />
        </View>

        <View style={styles.middleContainer}>
          <BodyXLTextBold
            style={{ color: colors.primary.primaryOne, marginHorizontal: "5%" }}
          >
            Masukkan Jumlah Penarikan
          </BodyXLTextBold>
          <View style={{ marginHorizontal: "5%" }}>
            <BodySmallText style={{ fontSize: 15, marginVertical: 8 }}>
              Silahkan masukkan jumlah uang yang ingin{"\n"}Anda tarik dengan
              <BodySmallTextSemiBold
                style={{ fontSize: 15, color: colors.primary.primaryOne }}
              >
                {" "}
                minimum penarikan {selectedWallet.currencyCode} 100
              </BodySmallTextSemiBold>
              .
            </BodySmallText>
            <InputCurrency
              selectedCurrency={transactionData.selectedCurrency}
              onChangeText={onChangeText}
            />
            {errorText !== "" && (
              <View style={styles.errorContainer}>
                <View style={styles.errorIconContainer}>
                  <Text style={styles.errorIcon}>!</Text>
                </View>
                <Text style={styles.errorText}>{errorText}</Text>
              </View>
            )}
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <View style={styles.boxRekeningSumber}>
              <WalletValasSource
                style={{ backgroundColor: "white" }}
                selectedWallet={selectedWallet}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {transactionData.inputValue === "" ||
          transactionData.inputValue % 100 != 0 ||
          transactionData.inputValue >
            transactionData.selectedWallet.balance ? (
            <StyledButton
              mode="primary-disabled"
              title="Lanjut"
              size={"lg"}
              style={{ marginHorizontal: "5%" }}
            />
          ) : (
            <StyledButton
              mode="primary"
              title="Lanjut"
              size={"lg"}
              onPress={onContinue}
              style={{ marginHorizontal: "5%" }}
            />
          )}
        </View>
      </View>
    )
  );
};

export default ValasTarikScreen;

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
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
  },
  bottomContainer: {
    flex: 0.15,
    width: "100%",
    justifyContent: "center",
  },
  errorContainer: {
    backgroundColor: "#FDE7DF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "#FF1200",
    marginLeft: 10,
  },
  errorIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EF5C26",
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    color: "white",
  },
  lineContainer: {
    width: "100%",
    marginTop: "5%",
  },
  line: {
    height: 4,
    backgroundColor: "#FDE7DF",
    borderColor: "#FDE7DF",
  },
  boxRekeningSumber: {
    backgroundColor: "#EF5C26",
  },
});

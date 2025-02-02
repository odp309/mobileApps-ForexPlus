import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  BodyLargeTextSemiBold,
  BodySmallText,
  BodySmallTextSemiBold,
  BodyXLTextBold,
  BodyXLTextSemiBold,
} from "../../components/shared/StyledText";
import colors from "../../theme/colors";
import ContentHeader from "../../components/valasHome/shared/ContentHeader";
import { useNavigation } from "@react-navigation/native";
import IncorrectPinMessage from "../../components/valasHome/IncorrectPinMessage";

const transactionData = {
  // Must
  isSetoranAwal: true, //boolean
  isTransfer: false, //boolean
  isSellOrPurchase: false, //boolean
  date: "29 Juni 2024",
  noRek: "1811209312",
  saldo: "1000", // Saldo transaksi
  tipeValas: "aud", //jpy,aud,usd, dan lain lainnya

  // Depends on the Type of Transaction
  transactionType: "Pembelian", // isSellOrPurchase = true => Pembelian || Penjualan
  namaPenerima: "Adelia Kinanti", // isTransfer = true
};

const PinConfirmationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [pinStatus, setPinStatus] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const transactionData = route.params?.transactionData;
  const handlePinChange = (text) => {
    if (text.length <= 6) {
      setPin(text);
    }
  };

  const sendTransaction = async () => {
    try {
      const beli = await fetchValasPurchase(
        transactionData.selectedWallet.id,
        transactionData.inputValue,
        pin
      ); 
      console.log('Transaction successful:', beli);
      navigation.navigate('TransactionResult'); 
    } catch (error) { 
      console.error('Transaction failed:', error);
      setPinStatus(false); 
    }
  }

  useEffect(() => {
    console.log(transactionData.selectedWallet.walletId);
    console.log(transactionData.inputValue); 
        transactionData.inputValue,
        pin
    setPinStatus(true);
    if (pin.length === 6) {
      if (pin === "654321") {
        console.log("benar");
        setPinStatus(true);
        navigation.navigate("TransactionResult", { transactionData });
      } else {
        console.log("salah");
        setErrorVisible(!errorVisible);
        setPinStatus(false);
      }
    }
  }, [pin]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Verifikasi PIN"} />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.contentContainer}>
          <BodyLargeTextSemiBold
            style={{ color: colors.secondary.secondaryTwo }}
          >
            Masukkan PIN BNI Mobile Banking
          </BodyLargeTextSemiBold>
          <View style={styles.pinContainer}>
            {[...Array(6)].map((_, index) => (
              <Image
                key={index}
                style={styles.pinImage}
                source={
                  !pinStatus && pin.length === 6
                    ? require("../../../assets/icon-pin-input-wrong.png")
                    : index < pin.length
                    ? require("../../../assets/icon-pin-input-selected.png")
                    : require("../../../assets/icon-pin-input.png")
                }
              />
            ))}
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              maxLength={6}
              value={pin}
              onChangeText={handlePinChange}
            />
          </View>
        </View>
        {errorVisible && (
          <View style={{ width: "100%", marginTop: 20 }}>
            <IncorrectPinMessage />
          </View>
        )}
      </View>
    </View>
  );
};

export default PinConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 1.05,
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
    flex: 0.9,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    width: "100%",
    borderRadius: 20,
    minHeight: 100,
    borderColor: colors.primary.primaryOne,
  },
  pinContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "7%",
    position: "relative",
    marginTop: 5,
  },
  pinImage: {
    width: 25,
    height: 25,
  },
  textInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    paddingVertical: 20,
  },
});

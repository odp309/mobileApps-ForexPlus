import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeTextSemiBold,
  BodySmallText,
  BodySmallTextSemiBold,
  BodyXLTextBold,
  BodyXLTextSemiBold,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import StyledButton from "../../../components/shared/StyledButton";
import { Image } from "react-native";
import InputCurrency from "../../../components/valasHome/shared/InputCurrency";
import WalletSource from "../../../components/valasHome/shared/WalletValasSource";
import ModalTransferConfirmation from "../../../components/valasHome/valasTransfer/ModalTransferConfirmation";
import { useNavigation, useRoute } from "@react-navigation/native";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";
import { fetchMinimumTransfer } from "../../../config/ValasConfig";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const EnterTransferScreen = () => {
  const route = useRoute();
  const currentWallet = route.params.currentWallet;
  const [minimumTransfer, setMinimumTransfer] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionData, setTransactionData] = useState({
    selectedWallet: route.params?.currentWallet,
    selectedRekening: route.params?.currentRekening,
    selectedCurrency: route.params?.currentCurrency,
    accountFind: route.params?.accountFind,
    inputValue: "",
  });

  const handleMoveToPin = () => {
    setModalVisible(false);
    navigation.navigate("PinConfirmation");
  };

  const toggleBottomSheet = () => {
    console.log(modalVisible);
    setModalVisible(!modalVisible);
  };

  const acceptInputCurrency = (data) => {
    setTransactionData((prevState) => ({
      ...prevState,
      inputValue: data,
    }));
  };

  const setFetchMinimum = async () => {
    const minimumData = await fetchMinimumTransfer(
      transactionData.selectedWallet.currencyCode.toUpperCase()
    );
    setMinimumTransfer(minimumData);
  };

  const isButtonDisabled = () => {
    const inputValue = parseFloat(transactionData.inputValue);
    const balance = parseFloat(transactionData.selectedWallet.balance);

    return (
      transactionData.inputValue === "" ||
      inputValue < minimumTransfer ||
      balance < inputValue
    );
  };

  useEffect(() => {
    setFetchMinimum();
  }, []);

  useEffect(() => {
    if (transactionData.inputValue > transactionData.selectedWallet.balance) 
    { 
      setErrorMessage("Saldo Anda tidak mencukupi");
    }
    else{
      setErrorMessage("");
    }
  }, [transactionData.inputValue]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Transfer Valas"} />
      </View>
      <View style={styles.middleContainer}>
        <BodyXLTextBold
          style={{ color: colors.primary.primaryOne, alignSelf: "center" }}
        >
          Masukkan Nominal Transfer
        </BodyXLTextBold>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: "https://imgur.com/o1jPFSo.png" }}
            style={{ width: 100, height: 100, borderRadius: 99 }}
          />
          <BodyLargeTextSemiBold style={{ marginTop: 10 }}>
            Wallet AUD
          </BodyLargeTextSemiBold>

          <BodyXLTextSemiBold style={{}}>
            {transactionData.accountFind.firstName +
              " " +
              transactionData.accountFind.lastName}
          </BodyXLTextSemiBold>

          <InputCurrency
            countryCode={transactionData.selectedWallet.currencyCode.toLowerCase()}
            value={transactionData.inputValue}
            onChangeText={acceptInputCurrency}
          />
          <View style={{width:"100%"}}>
            <BodySmallText style={{textAlign:"flex-start", color:"red"}}>{errorMessage}</BodySmallText>
          </View>
        </View>
        <View
          style={{ height: 4, backgroundColor: colors.primary.primaryThree }}
        />
        <View style={styles.walletContainer}>
          <WalletSource
            countryCode={currentWallet.currencyCode.toLowerCase()}
            saldo={currentWallet.balance}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          title={"Lanjut"}
          size={"lg"}
          mode={isButtonDisabled() ? "primary-disabled" : "primary"}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          disabled={isButtonDisabled()}
        />
      </View>
      <ConfirmationModal
        title={"Konfirmasi Transfer Valas"}
        transactionType={"transfer"}
        isVisible={modalVisible}
        toggleBottomSheet={toggleBottomSheet}
        transactionData={transactionData}
      />
    </View>
  );
};

export default EnterTransferScreen;

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
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  walletContainer: {
    marginTop: 20,
  },
});

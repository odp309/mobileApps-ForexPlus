import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeTextSemiBold,
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


const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const EnterTransferScreen = () => { 
  const route = useRoute();
  const { data } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [nominal, setNominal] = useState(0);
  const navigation = useNavigation();

  const handleMoveToPin = () =>{
    setModalVisible(false);
    navigation.navigate("PinConfirmation");
  }
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
            source={require("../../../../assets/icon-user-he.png")}
            style={{ width: 100, height: 100, borderRadius: 99 }}
          />
          <BodyLargeTextSemiBold style={{ marginTop: 10 }}>
            Wallet AUD
          </BodyLargeTextSemiBold>

          <BodyXLTextSemiBold style={{}}>{data.nama}</BodyXLTextSemiBold>

          <InputCurrency
            countryCode={"aud"}
            value={nominal}
            onChangeText={setNominal}
          ></InputCurrency>
        </View>

        <View style={styles.walletContainer}>
          <WalletSource
          countryCode={"jpy"} saldo={"2000"}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          title={"Lanjut"}
          size={"lg"}
          mode={"primary"}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
      <ConfirmationModal
          title={"Konfirmasi Pembelian Valas"}
          isVisible={modalVisible}
          toggleBottomSheet={()=> setModalVisible(false)}  
          namaPenerima={"aa"}
          totalTransfer={nominal}
          transactionType={"transfer"}
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

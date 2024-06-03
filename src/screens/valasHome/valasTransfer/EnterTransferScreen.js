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
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import ModalTransferConfirmation from "./ModalTransferConfirmation";
import { useNavigation, useRoute } from "@react-navigation/native";

const EnterTransferScreen = () => { 
  const route = useRoute();
  const { data } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [nominal, setNominal] = useState(0);
  const navigation = useNavigation();

  const handleMoveToPin = () =>{
    setModalVisible(false);
    navigation.navigate("PinConfirmationTransfer");
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
          <WalletSource />
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
      <ModalTransferConfirmation
        data={data}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nominal={nominal}
        onPress={()=> handleMoveToPin()}
      />
    </View>
  );
};

export default EnterTransferScreen;

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

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  BodyLargeTextSemiBold,
  BodyMediumText,
  BodyMediumTextSemiBold,
  BodySmallText,
  BodySmallTextSemiBold,
  HeadingSixText,
} from "../../../components/shared/StyledText";
import StyledButton from "../../../components/shared/StyledButton";
import colors from "../../../theme/colors";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import { FontAwesome } from "@expo/vector-icons";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import ExchangeResult from "../../../components/valasHome/shared/ExchangeResult";
import InputCurrency from "../../../components/valasHome/shared/InputCurrency";
import ModalVerification from "./ModalVerification";

export default function ValasBeliScreen() {
  const navigation = useNavigation();

  const [nominalPembelian, setNominalPembelian] = useState("");
  const [nominalAsal, setNominalAsal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleNominalPembelianChange = (text) => {
    setNominalPembelian(text);
  };

  const handleNominalAsalChange = (text) => {
    setNominalAsal(text);
  };

  const handlePinVerification = () => {
    setModalVisible(false);
    navigation.navigate("PinConfirmation");
  };

  return (
    <View style={styles.container}>
      <ModalVerification
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handlePinVerification={handlePinVerification}
      />
      <View style={styles.topContainer}>
        <ContentHeader title={"Pembelian Valas"} />
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.inputContainer}>
          <BodySmallTextSemiBold style={styles.inputLabel}>
            Nominal Pembelian
          </BodySmallTextSemiBold>
          <InputCurrency countryCode="jpy" />
        </View>
        <View style={styles.arrowDownContainer}>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <FontAwesome
              name="long-arrow-down"
              size={24}
              color={colors.primary.primaryOne}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <BodySmallTextSemiBold style={styles.inputLabel}>
            Nominal Asal
          </BodySmallTextSemiBold>
          <ExchangeResult />
        </View>
        <View style={styles.kursBeliContainer}>
          <BodySmallTextSemiBold style={styles.kursBeliText}>
            Kurs Beli
          </BodySmallTextSemiBold>
          <BodySmallTextSemiBold style={styles.kursBeliValue}>
            AUD 1 = IDR 11.973
          </BodySmallTextSemiBold>
        </View>
        <View style={styles.boxRekeningSumber}>
          <WalletSource
            judul={"TAPLUS PEGAWAI BNI"}
            isi={"18901517618"}
            saldo={"IDR 10.000.000"}
            countryCode='jpy'
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          title={"Lanjut"}
          mode={"primary"}
          style={{ marginTop: 10 }}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
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
    justifyContent: "flex-start",
    flex: 0.15,
    paddingHorizontal: 20,
  },

  arrowDownContainer: {
    alignItems: "center",

    marginTop: 8,
    marginBottom: 0,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  kursBeliContainer: {
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  kursBeliText: {
    marginBottom: 5,
    color: "#535353",
  },
  kursBeliValue: {
    color: "#EF5C26",
  },
  boxRekeningSumber: {
    backgroundColor: "#F0EBEB",
  },
  rekeningSumberContainer: {
    marginBottom: 20,
  },
  rekeningSumberLabel: {
    bottom: 8,
  },
  rekeningSumberText: {
    top: 2,
    left: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#535353",
  },
  rekeningSumberDetails: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rekeningSumberName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rekeningSumberNumber: {
    top: -5,
    left: 10,
    fontSize: 18,
    marginBottom: 5,
    color: "#000000",
  },
  rekeningSumberSaldo: {
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  rekeningSumberImage: {
    width: "35%",
    // borderWidth:1
  },
  bniImage: {
    width: "100%",
    left: 75,
    borderColor: "red",
    height: 100,
  },
});

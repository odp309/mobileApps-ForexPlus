import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BodySmallText } from "../shared/StyledText";
import ModalDaftarRekening from "./ModalDaftarRekening";
import ModalDaftarWallet from "./ModalDaftarWallet";
import colors from "../../theme/colors";

const NavigasiRekeningWallet = ({
  selectedRekening,
  setSelectedRekening,
  selectedWallet,
  setSelectedWallet,
  listRekening,
}) => {
  const [modalWalletVisible, setModalWalletVisible] = useState(false);
  const [modalRekeningVisible, setModalRekeningVisible] = useState(false);
 
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <BodySmallText style={styles.text}>Nomor Rekening</BodySmallText>
        {selectedRekening && (
          <ModalDaftarRekening
            selectedRekening={selectedRekening}
            setModalVisible={setModalRekeningVisible}
            modalVisible={modalRekeningVisible}
            listRekening={listRekening}
            setSelectedRekening={setSelectedRekening}
          />
        )}
      </View>

      {selectedWallet && <View style={styles.divider} />}

      {selectedWallet && (
        <View style={styles.section}>
          <BodySmallText style={styles.text}>Dompet Valas</BodySmallText>
          <ModalDaftarWallet
            modalVisible={modalWalletVisible}
            setModalVisible={setModalWalletVisible}
            listWallet={selectedRekening.listWallet}
            selectedWallet={selectedWallet}
            setSelectedWallet={setSelectedWallet}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  section: {
    flex: 1,
    paddingTop: 10,
  },
  text: {
    paddingHorizontal: 20,
  },
  divider: {
    width: 4,
    backgroundColor: colors.primary.primaryThree,
  },
});

export default NavigasiRekeningWallet;

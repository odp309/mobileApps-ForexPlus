import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { BodySmallText } from "../shared/StyledText";
import colors from "../../theme/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const FeatureButton = ({ namaFitur, onPress }) => {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <View
        style={{
          backgroundColor: colors.primary.primaryOne,
          borderRadius: 20,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {namaFitur === "Beli" ? (
          <Ionicons
            name="bag-handle-outline"
            size={24}
            color={colors.color.white}
          />
        ) : namaFitur === "Jual" ? (
          <Ionicons
            name="pricetag-outline"
            size={24}
            color={colors.color.white}
          />
        ) : namaFitur === "Transfer" ? (
          <MaterialCommunityIcons
            name="account-switch-outline"
            size={24}
            color={colors.color.white}
          />
        ) : namaFitur === "Riwayat" ? (
          <MaterialCommunityIcons
            name="clipboard-outline"
            size={24}
            color={colors.color.white}
          />
        ) : namaFitur === "Tarik" ? (
          <MaterialCommunityIcons
            name="bank"
            size={24}
            color={colors.color.white}
          />
        ) : (
          <Text>namaFitur salah value</Text>
        )}
      </View>
      <BodySmallText style={{ color: colors.primary.primaryOne }}>
        {namaFitur}
      </BodySmallText>
    </TouchableOpacity>
  );
};

const ValasFeatures = ({
  selectedRekening,
  selectedWallet,
  selectedCurrency,
  modalVisibleTarik,
  setModalVisibleTarik,
  modalVisibleBeli,
  setModalVisibleBeli,
}) => {
  const [hasReservasi, setReservasi] = useState(null);
  
  const getFetchTransaction = async () =>{


  }
  useState(()=>{
      
  },[])
  const navigation = useNavigation();

  const handleNavigateTarik = () => {
    setModalVisibleTarik(!modalVisibleTarik);
    // navigation.navigate("TarikValas", {
    //   selectedRekening,
    //   selectedWallet,
    //   selectedCurrency,
    // })
  };
  const handleNavigateBeli = () => {
    setModalVisibleBeli(!modalVisibleBeli);
    // navigation.navigate("ValasBeli", {
    //   selectedRekening,
    //   selectedWallet,
    //   selectedCurrency,
    // })
  };
  return (
    <View style={styles.container}>
      <FeatureButton namaFitur="Beli" onPress={() => handleNavigateBeli()} />
      <FeatureButton
        namaFitur="Jual"
        onPress={() =>
          navigation.navigate("JualValas", {
            selectedRekening,
            selectedWallet,
            selectedCurrency,
          })
        }
      />
      <FeatureButton
        namaFitur="Transfer"
        onPress={() =>
          navigation.navigate("TransferValas", {
            selectedRekening,
            selectedWallet,
            selectedCurrency,
          })
        }
      />
      <FeatureButton namaFitur="Tarik" onPress={() => handleNavigateTarik()} />
      <FeatureButton
        namaFitur="Riwayat"
        onPress={() => navigation.navigate("Riwayat", { selectedWallet })}
      />
    </View>
  );
};

export default ValasFeatures;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingBottom: 10,
  },
});

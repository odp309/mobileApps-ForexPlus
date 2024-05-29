import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { BodySmallText } from "../shared/StyledText";
import colors from "../../theme/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const FeatureButton = ({ namaFitur }) => {
  return (
    <TouchableOpacity style={{alignItems:'center'}} onPress={() => {}}>
      <View
        style={{
          backgroundColor: colors.primary.primaryTwo,
          borderRadius: 20,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {namaFitur === "Beli" ? (
          <Ionicons name="bag-handle-outline" size={24} color={colors.color.white} />
        ) : namaFitur === "Jual" ? (
          <Ionicons name="pricetag-outline" size={24} color={colors.color.white} />
        ) : namaFitur === "Transfer" ? (
          <MaterialCommunityIcons
            name="account-switch-outline"
            size={24}
            color={colors.color.white}
          />
        ) : namaFitur === "Tarik" ? (
          <MaterialCommunityIcons name="bank" size={24} color={colors.color.white}/>
        ) : (
          <Text>namaFitur salah value</Text>
        )}
      </View>
      <BodySmallText style={{color:colors.primary.primaryOne}}>{namaFitur}</BodySmallText>
    </TouchableOpacity>
  );
};

const ValasFeatures = () => {
  return (
    <View style={styles.container}>
      <FeatureButton namaFitur="Beli" />
      <FeatureButton namaFitur="Jual" />
      <FeatureButton namaFitur="Transfer" />
      <FeatureButton namaFitur="Tarik" />
    </View>
  );
};

export default ValasFeatures;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: "row",
    paddingBottom: 10,
  },
});

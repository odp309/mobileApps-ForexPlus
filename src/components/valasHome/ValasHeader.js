import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../theme/colors";
import {
  BodySmallText,
  HeadingFiveText,
  HeadingSixText,
} from "../shared/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BackgroundBNI from "./BackgroundBNI";

const RiwayatButton = () => {
  return (
    <TouchableOpacity style={styles.riwayatBtn}>
      <Image
        style={{
          width: 20,
          height: 20,
          alignSelf: "center",
        }}
        resizeMode="contain"
        source={require("../../../assets/Riwayat.png")}
      />
      <BodySmallText style={{ color: colors.primary.primaryOne }}>
        Riwayat
      </BodySmallText>
    </TouchableOpacity>
  );
};

function ValasHeader() {
  const navigation = useNavigation();

  const backToHome = () => {
    navigation.navigate("Beranda");
  };

  return (
    <View style={styles.container}>
      <BackgroundBNI />
      <TouchableOpacity style={styles.topHeader} onPress={backToHome}>
        <Ionicons name="arrow-back" size={24} color={colors.color.white} />
        <RiwayatButton />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <MaterialCommunityIcons
          name="wallet"
          size={40}
          color={colors.color.white}
        />
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <HeadingFiveText
            style={{ color: colors.color.white, fontWeight: "bold" }}
          >
            BNI Valas
          </HeadingFiveText>
          <HeadingSixText
            style={{ color: colors.color.white, fontWeight: "bold" }}
          >
            +
          </HeadingSixText>
        </View>
      </View>
    </View>
  );
}

export default ValasHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 50,
    paddingBottom: 26,
    top:-32,
    
    zIndex:1,
    position:'absolute'
  },
  topHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  riwayatBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.color.white,
    padding: 4,
    borderRadius: 20,
    minWidth: 110,
  },
});

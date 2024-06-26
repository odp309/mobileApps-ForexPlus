import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import BackButton from "../shared/BackButton"; 

 const WINDOW_HEIGHT = Dimensions.get('window').height * 1.05;
function ValasHeader() {
  const navigation = useNavigation();

  const backToHome = () => {
    navigation.navigate("Beranda");
  };

  return (
    <View style={styles.container}>
      <BackgroundBNI />
      <View style={styles.topHeader}>
        <BackButton
          onPress={() => navigation.goBack()}
          color={colors.color.white}
        /> 
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 30, 

        }}
      >
        <Image style={{width:40,height:40}} source={require("../../../assets/valas-plus.png")} resizeMode="center"/>
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
    alignItems: "center",  
    height:WINDOW_HEIGHT * 0.22,
    zIndex: 1,
    position: "absolute",
    width:"100%", 
    borderBottomRightRadius:20,
  },
  topHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop:"10%"
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

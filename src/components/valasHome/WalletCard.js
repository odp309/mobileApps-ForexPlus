import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import colors from "../../theme/colors";
import { BodyLargeText, BodyMediumText } from "../shared/StyledText";
import { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";


const WINDOW_HEIGHT = Dimensions.get("window").height;
const WalletCard = ({ valasType, selectedWallet }) => {
  const [hiddenText, setHiddenText] = useState(selectedWallet.balance);
  const [hideText, setHideText] = useState(true);

  useEffect(() => { 
    setHiddenText(
      hideText
        ? hideTextWithAsterisks(selectedWallet.balance)
        : selectedWallet.balance
    );
  }, [selectedWallet.balance,hideText]);

  const hideTextWithAsterisks = (text) => {
    return "*".repeat(text.toString().length);
  };

  const toggleHideText = () => {
    setHideText(!hideText); 
  };

  return (
    <View style={styles.container}>
      <View style={{width:"50%",justifyContent:'center'}}>
      <BodyMediumText style={{ color: colors.primary.primaryOne }}>
        Saldo Aktif
      </BodyMediumText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          width: "70%",
          justifyContent:"space-between", 
        }}
      >
        <BodyLargeText style={styles.boldText}>{valasType}</BodyLargeText>
        <BodyLargeText style={styles.boldText}>{hiddenText}</BodyLargeText>
        <TouchableOpacity onPress={toggleHideText}>
          <Fontisto name={hideText ? "locked" : "unlocked"} size={18} color={colors.primary.primaryOne} />
        </TouchableOpacity>
      </View>
      </View>


      <View style={{height:"100%"}}>
        <View style={{alignSelf:'flex-end'}}>
        <Image source={{uri:selectedWallet.landmarkIcon}} style={{height:"100%",width:150,borderWidth:1}} resizeMode="contain" />
        </View>
      </View>
      
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 30, 
    width: "90%",
    height: WINDOW_HEIGHT * 0.22,
    backgroundColor: colors.primary.primaryThree,
    borderRadius: 30,
    flexDirection:'row'
  },
  boldText: {
    fontWeight: "bold",
    color: colors.primary.primaryOne,
  },
});

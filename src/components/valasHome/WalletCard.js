import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../../theme/colors";
import { BodyLargeText, BodyMediumText } from "../shared/StyledText";
import { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";

const WalletCard = ({ valasType, selectedWallet }) => {
  const [hiddenText, setHiddenText] = useState(selectedWallet.balance);
  const [hideText, setHideText] = useState(false);

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
      <BodyMediumText style={{ color: colors.primary.primaryOne }}>
        Saldo Aktif
      </BodyMediumText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          width: "50%",
          justifyContent: "space-evenly",
        }}
      >
        <BodyLargeText style={styles.boldText}>{valasType}</BodyLargeText>
        <BodyLargeText style={styles.boldText}>{hiddenText}</BodyLargeText>
        <TouchableOpacity onPress={toggleHideText}>
          <Fontisto name={hideText ? "locked" : "unlocked"} size={20} color={colors.primary.primaryOne} />
        </TouchableOpacity>
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
    paddingVertical: 40,
    width: "90%",
    height: Dimensions.get("screen").height * 0.2,
    backgroundColor: colors.primary.primaryThree,
    borderRadius: 30,
    zIndex: -1,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.primary.primaryOne,
  },
});

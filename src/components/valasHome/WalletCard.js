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
    setHiddenText(hideText ? "* * * * *" : selectedWallet.balance);
  }, [selectedWallet.balance, hideText]);

  const toggleHideText = () => {
    setHideText(!hideText);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ width: "70%", justifyContent: "flex-start", paddingTop: 35 }}
      >
        <BodyMediumText
          style={{ color: colors.primary.primaryOne, fontSize: 17 }}
        >
          Saldo Aktif
        </BodyMediumText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <BodyLargeText style={styles.boldText}>{valasType}</BodyLargeText>
          <BodyLargeText style={styles.boldText}>{hiddenText}</BodyLargeText>
          <TouchableOpacity
            onPress={toggleHideText}
            style={{
              marginBottom: 5,
              minWidth: 30,
              minHeight: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fontisto
              name={hideText ? "locked" : "unlocked"}
              size={20}
              color={colors.primary.primaryOne}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: "100%", justifyContent: "flex-end" }}>
        <Image
          source={{ uri: selectedWallet.landmarkIcon }}
          style={{ height: "100%", width: 80, borderColor: "red" }}
          resizeMode="cover"
        />
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
    flexDirection: "row",
  },
  boldText: {
    fontWeight: "bold",
    color: colors.primary.primaryOne,
    fontSize: 22,
  },
});

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import { BodyLargeText, BodyMediumText } from "../shared/StyledText";
import { useState } from "react";
import { Fontisto } from "@expo/vector-icons";

const WalletCard = ({ valasType }) => {
  const [inputText, setInputText] = useState("1000000");
  const [hiddenText, setHiddenText] = useState("*******");
  const [hideText, setHideText] = useState(true);

  const hideTextWithAsterisks = (text) => {
    return "*".repeat(text.length);
  };

  const toggleHideText = () => {
    setHideText(!hideText);
    setHiddenText(hideText ? inputText : hideTextWithAsterisks(inputText));
  };

  return (
    <View style={styles.container}>
      <BodyMediumText style={{color:colors.primary.primaryOne}}>Saldo Aktif</BodyMediumText>
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
        <BodyLargeText style={styles.boldText}>
          {hiddenText}
        </BodyLargeText>
        <TouchableOpacity onPress={toggleHideText}>
          <Fontisto name="locked" size={20} color={colors.primary.primaryOne} />
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
    width: "86%",
    height: 180,
    backgroundColor: colors.primary.primaryThree,

    borderRadius: 30,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.primary.primaryOne,
  },
});

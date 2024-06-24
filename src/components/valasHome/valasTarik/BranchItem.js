import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BodyMediumText, BodySmallText } from "../../shared/StyledText";
import colors from "../../../theme/colors";
import { useEffect } from "react";

const BRANCH_TEXT_LENGTH = 24;

const BranchItem = ({ data, handleOnPress }) => {
  const longText = (text) => {
    const newText = text.slice(0, BRANCH_TEXT_LENGTH);
    const textWithDot = newText + "...";
    return textWithDot;
  }; 

  return (
    <TouchableOpacity style={styles.branchItem} onPress={()=> handleOnPress(data)}>
      <View style={{ marginHorizontal: 15 }}>
        <FontAwesome
          name="bank"
          size={40}
          color={colors.secondary.secondaryOne}
        />
      </View>
      <View>
        {/* If the text is too long, then replace the 25 index to the last as ... */}
        {data.name.length <= 24 ? (
          <BodyMediumText style={{ fontWeight: "bold" }}>
            {data.name}
          </BodyMediumText>
        ) : (
          <BodyMediumText style={{ fontWeight: "bold" }}>
            {longText(data.name)}
          </BodyMediumText>
        )}

        <BodySmallText style={{ fontWeight: "bold", color: colors.color.grey }}>
          {data.province}, {data.city}
        </BodySmallText>
      </View>
    </TouchableOpacity>
  );
};

export default BranchItem;

const styles = StyleSheet.create({
  branchItem: {
    marginHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary.primaryThree,
    flexDirection: "row",
  },
});

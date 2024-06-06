import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BodyMediumText, BodySmallText } from "../../shared/StyledText";
import colors from "../../../theme/colors";


const BranchItem = ({ data, handleOnPress }) => {
  // Function to return the branch name to branchName...
  const longText = (text) => {
    const newText = text.slice(0, 24);
    const textWithDot = newText + "...";
    return textWithDot;
  };
  // Function when press on of the item
  const onPressItem = () => {
    handleOnPress(data);
  };

  return (
    <TouchableOpacity style={styles.branchItem} onPress={onPressItem}>
      <View style={{ marginHorizontal: 15 }}>
        <FontAwesome
          name="bank"
          size={40}
          color={colors.secondary.secondaryOne}
        />
      </View>
      <View>
        {/* If the text is too long, then replace the 25 index to the last as ... */}
        {data.branchName.length <= 24 ? (
          <BodyMediumText style={{ fontWeight: "bold" }}>
            {data.branchName}
          </BodyMediumText>
        ) : (
          <BodyMediumText style={{ fontWeight: "bold" }}>
            {longText(data.branchName)}
          </BodyMediumText>
        )}

        <BodySmallText style={{ fontWeight: "bold", color: colors.color.grey }}>
          {data.alamat}
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

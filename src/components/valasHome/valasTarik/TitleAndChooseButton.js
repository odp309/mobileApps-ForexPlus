import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BodyMediumText, HeadingSixText } from "../../shared/StyledText";


const TitleAndChooseButton = ({ onChooseDatePress }) => {
    return (
      <View style={styles.titleSearchContainer}>
        {/* Title */}
        <HeadingSixText
          style={{
            fontWeight: "bold",
            color: colors.primary.primaryOne,
            marginBottom: 10,
          }}
        >
          Pilih Hari Kedatangan
        </HeadingSixText>
  
        {/* Choose Date */}
        <TouchableOpacity style={styles.chooseDate} onPress={onChooseDatePress}>
          <BodyMediumText style={{ color: colors.color.grey }}>
            Pilih Tanggal
          </BodyMediumText>
          <View>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={30}
              color={colors.color.grey}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
export default TitleAndChooseButton;
  const styles = StyleSheet.create({
    titleSearchContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        width: "100%",
      },
    chooseDate: {
        width: "100%",
        minHeight: 50,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: colors.color.lightGrey,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
  })
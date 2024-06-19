import { View } from "react-native";
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { BodySmallTextSemiBold } from "../shared/StyledText";

const IncorrectPinMessage = () => {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        marginLeft:5,
        marginTop:5
        // backgroundColor: colors.color.errorTransparent,
        // flexDirection: "row",
        // padding: 10,
      }}
    >
      {/* <Ionicons
        name="alert-circle-outline"
        size={16}
        style={{ marginTop: 1, marginRight: 5 }}
        color={colors.color.error}
      /> */}
      <BodySmallTextSemiBold style={{ color: colors.color.error }}>
        PIN yang Anda masukkan salah. Coba lagi.
      </BodySmallTextSemiBold>
    </View>
  );
};

export default IncorrectPinMessage;

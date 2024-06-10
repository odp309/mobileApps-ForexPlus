import { StyleSheet, View } from "react-native";
import { BodyRegularText, BodySmallText } from "../../shared/StyledText";
import InputCurrency from "./InputCurrency";
import { FontAwesome } from "@expo/vector-icons";
import ExchangeResult from "./ExchangeResult";
import colors from "../../../theme/colors";

const ValasConversion = ({
  firstInputTitle,
  secondInputTitle,
  containerStyle,
  exchange,
  changeTextData,
  firstError,
  secondError,
}) => {
  return (
    <View style={[containerStyle, styles.container]}>
      {/* Nominal Penjualan (InputCurrency) */}
      <View>
        <BodyRegularText
          style={{ color: colors.color.grey, fontWeight: "bold" }}
        >
          {firstInputTitle}
        </BodyRegularText>
        <InputCurrency countryCode="jpy" onChangeText={changeTextData} />
        <BodySmallText style={{ color: colors.color.error }}>
          {firstError}
        </BodySmallText>
      </View>

      {/* DownArrowButton */}
      <View style={{ alignItems: "center", marginVertical: 5 }}>
        <FontAwesome
          name="long-arrow-down"
          size={24}
          color={colors.primary.primaryOne}
        />
      </View>

      {/* Nominal Pendaptan (ExchangeResult) */}
      <View style={{ alignItems: "flex-start", marginVertical: 0 }}>
        <BodyRegularText
          style={{ color: colors.color.grey, fontWeight: "bold" }}
        >
          {secondInputTitle}
        </BodyRegularText>
        <ExchangeResult value={exchange} />
        <BodySmallText style={{ color: colors.color.error }}>
          {secondError}
        </BodySmallText>
      </View>
    </View>
  );
};

export default ValasConversion;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

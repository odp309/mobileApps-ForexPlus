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
  transactionData,
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
        <InputCurrency
          selectedCurrency={transactionData.selectedCurrency}
          onChangeText={changeTextData}
          value={transactionData.inputValue}
        />

        <BodySmallText style={{ color: colors.color.error, fontSize: 12 }}>
          {firstError}
        </BodySmallText>
      </View>

      {/* DownArrowButton */}
      <View style={{ alignItems: "center" }}>
        <FontAwesome
          name="long-arrow-down"
          size={20}
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
        <ExchangeResult value={transactionData.convertedValue} />
        {secondError[0] === "J" ? (
          <BodySmallText style={{ color: colors.color.error, fontSize: 12 }}>
            {secondError}
          </BodySmallText>
        ) : null}
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

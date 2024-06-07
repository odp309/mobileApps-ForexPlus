import { StyleSheet, View } from "react-native";
import { BodyRegularText } from "../../shared/StyledText";
import InputCurrency from "../shared/InputCurrency";
import { FontAwesome } from "@expo/vector-icons";
import ExchangeResult from "../shared/ExchangeResult";
import colors from "../../../theme/colors";


const ValasConversion = ({ containerStyle, exchange, changeTextData }) => {
    const sendChangeText = (data) => {
      changeTextData(data)
    }
    return (
      <View style={[containerStyle]}>
        {/* Nominal Penjualan (InputCurrency) */}
        <View>
          <BodyRegularText
            style={{ color: colors.color.grey, fontWeight: "bold" }}
          >
            Nominal Penjualan
          </BodyRegularText>
          <InputCurrency countryCode="jpy" onChangeText={sendChangeText} />
        </View>
  
        {/* DownArrowButton */}
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <FontAwesome
            name="long-arrow-down"
            size={24}
            color={colors.primary.primaryOne}
          />
        </View>
  
        {/* Nominal Pendaptan (ExchangeResult) */}
        <View style={{ alignItems: "flex-start", marginVertical: 10 }}>
          <BodyRegularText
            style={{ color: colors.color.grey, fontWeight: "bold" }}
          >
            Nominal Pendapatan
          </BodyRegularText>
          <ExchangeResult value={exchange} />
        </View>
      </View>
    );
  };

  export default ValasConversion;

  const styles = StyleSheet.create({
    container:{
        width:'100%'
    }
  })
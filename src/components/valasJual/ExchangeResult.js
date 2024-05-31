import { StyleSheet, View,Image } from "react-native";
import React from "react";
import { BodyRegularText,BodyMediumText } from "../shared/StyledText";
import colors from "../../theme/colors";

const ExchangeResult = ({value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        <Image
          source={require("../../../assets/icons/flags/Indonesia.png")}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        <BodyMediumText
          style={{ color: colors.color.grey, fontWeight: "bold" }}
        >
          IDR
        </BodyMediumText>
      </View>
      <BodyRegularText style={styles.resultStyle}>{value}</BodyRegularText>
    </View>
  );
};

export default ExchangeResult;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        marginVertical: 10,
        width: "100%",
        height:42,
        borderRadius: 100, // Adjust the border radius as needed
        backgroundColor: colors.color.lightGrey,
        borderWidth: 2,
        borderColor:  colors.color.lightGrey,
      },
      countryContainer: {
        position: "absolute",
        marginLeft: "4%",
        paddingRight: '4%',
        flexDirection: "row",
        alignItems: "center",
        borderRightWidth: 2,
        borderColor: colors.color.grey,
        height:"100%"
      },
      resultStyle: {
        paddingLeft: 100,
        borderRadius: 100,
        borderColor: colors.primary.primaryOne,
        color: colors.color.grey,
        fontFamily: "poppins-regular",
      },
});

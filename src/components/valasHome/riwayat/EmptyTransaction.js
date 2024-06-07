import { Image, StyleSheet, View } from "react-native";
import { BodySmallText } from "../../shared/StyledText";
import colors from "../../../theme/colors";

const EmptyTransaction = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/amico.png")}
        style={{ width: 200, height: 200 }}
      />
      <BodySmallText style={{color:colors.color.grey}}>Anda belum memiliki riwayat transaksi</BodySmallText>
    </View>
  );
};

export default EmptyTransaction;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

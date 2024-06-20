import { Image, StyleSheet, View } from "react-native";
import { BodySmallText } from "../../shared/StyledText";
import colors from "../../../theme/colors";

const EmptyTransaction = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: "https://imgur.com/eOq6VvJ.png"}}
        style={{ width: 200, height: 200,marginBottom:20 }}
      />
      <BodySmallText style={{color:colors.color.grey}}>Anda belum memiliki riwayat transaksi</BodySmallText>
    </View>
  );
};

export default EmptyTransaction;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height:'70%',
    justifyContent: "center",
    alignItems: "center",
  },
});

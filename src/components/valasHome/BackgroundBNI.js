import { StyleSheet, View, Image } from "react-native";
import colors from "../../theme/colors";


const BackgroundBNI = () => {
    return (
      <View style={styles.backgroundBNI}>
        <Image
        resizeMode="stretch"
          style={{
            width: "100%",
            height: "100%",
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
          }}
          source={require("../../../assets/Intersect.png")}
        />
      </View>
    );
  };

  export default BackgroundBNI;

  const styles = StyleSheet.create({
    backgroundBNI: {
      width: "100%",
      height: '100%',
      position: "absolute",
      backgroundColor: colors.primary.primaryOne,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50, 
    },
  });
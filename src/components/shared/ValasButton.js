import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";
import { useEffect, useState } from "react";
import sizes from "../../theme/sizes";

// Value-Value tipeValas:
// sgd = Singapura
// jpy = Jepang
// krw = Korea
// aud = Australia
// usd = USA
// cny = China
// myr = Malaysia
// eur = Euro

function ValasButton({ tipeValas, onPressValas }) {
  const [namaValas, setNamaValas] = useState("Valas");
  const [pathGambar, setPathGambar] = useState(require('../../../assets/adaptive-icon.png'));
  useEffect(() => {
    if (tipeValas === "sgd") {
      setNamaValas("Dolar Singapura");
      setPathGambar(require(`../../../assets/icons/flags/Singapore.png`));
    }
    else if(tipeValas === "jpy"){
        setNamaValas("Yen Jepang");
        setPathGambar(require('../../../assets/icons/flags/Japan.png'));
    }
    else if(tipeValas === "krw"){
        setNamaValas("Won Korea");
        setPathGambar(require('../../../assets/icons/flags/South_Korea.png'));
    }
    else if(tipeValas === "aud"){
        setNamaValas("Dolar Australia");
        setPathGambar(require('../../../assets/icons/flags/Australia.png'));
    }
    else if(tipeValas === "usd"){
        setNamaValas("Dolar Amerika");
        setPathGambar(require('../../../assets/icons/flags/United_States.png'));
    }
    else if(tipeValas === "cny"){
        setNamaValas("Yuan Tionkok");
        setPathGambar(require('../../../assets/icons/flags/China.png'));
    }
    else if(tipeValas === "myr"){
        setNamaValas("Ringgit Malaysia");
        setPathGambar(require('../../../assets/icons/flags/Malaysia.png'));
    }
    else if(tipeValas === "eur"){
        setNamaValas("Euro");
        setPathGambar(require('../../../assets/icons/flags/European_Union.png'));
    }
  }, []);

  return (
    <TouchableOpacity style={styles.valasContainer} onPress={onPressValas}>
      <Image style={styles.tinyLogo} source={pathGambar} />
      <Text style={styles.valasText}>{namaValas}</Text>
    </TouchableOpacity>
  );
}

export default ValasButton;

const styles = StyleSheet.create({
  valasContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingLeft: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.primary.primaryOne,
    borderRadius: sizes.font.medium,
    backgroundColor: colors.color.white
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  valasText:{
    fontFamily: 'poppins-regular',
    fontSize: sizes.font.medium,
    fontWeight: 'bold'
  }
});

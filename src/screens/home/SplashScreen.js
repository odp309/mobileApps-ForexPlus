import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { BodySmallText } from "../../components/shared/StyledText";

const screenHeight = Dimensions.get("window").height * 1.05;

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{ uri: "https://i.imgur.com/qPgwgw6.png" }}
      >
        <View style={styles.topContainer}>
          <Image
            style={{ width: "40%", height: 50, marginBottom: 10 }}
            resizeMode="contain"
            source={{ uri: "https://i.imgur.com/rkL9Et5.png" }}
          />
          <BodySmallText>Melayani Negeri Kebanggaan Indonesia</BodySmallText>
        </View>

        <View style={styles.bottomContainer}>
        <Image
            style={{ width: "40%", height: 40, marginBottom: 10 }}
            resizeMode="contain"
            source={{ uri: "https://imgur.com/5difbZ0.png" }}
          />
          <BodySmallText style={[styles.copyright, { marginBottom: 15, lineHeight:14 }]}>
            PT Bank Negara Indonesia (Persero) Tbk, berizin dan diawasi oleh
            Otoritas Jasa Keuangan (OJK) serta merupakan peserta penjaminan
            Lembaga Penjamin Simpanan (LPS)
          </BodySmallText>
          <BodySmallText style={styles.copyright}>
            Hak Cipta © 2024 BNI Mobile Banking
          </BodySmallText>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: screenHeight,
  },
  topContainer: {
    flex: 0.37,
    paddingVertical: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    flex: 0.53,
    alignItems: "center",
    justifyContent: "flex-end",
    // paddingBottom: "20%",
    paddingHorizontal: "10%",
    width: "100%",
  },
  copyright: {
    fontSize: 9,
    textAlign: "center",
  },
});

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeText,
  BodySmallText,
} from "../../../components/shared/StyledText";
import { useState } from "react";
import EmptyTransaction from "../../../components/valasHome/riwayat/EmptyTransaction";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../theme/colors";

const dummyRiwayat = [
  {
    monthYear: "Mei 2024",
    data: [
      {
        type: "Tarik",
        kantorCabang: "KCP Central Park Kota",
        transactionValue: 10000,
        valas: "JPY",
        date: "26 Mei 2024",
      },
      {
        type: "Jual",
        transactionValue: 1000,
        valas: "JPY",
        date: "10 Mei 2024",
      },
      {
        type: "Beli",
        transactionValue: 90000,
        valas: "JPY",
        date: "2 Mei 2024",
      },
    ],
  },
];

const ValasRiwayatScreen = () => {
  const [isRiwayatAvailable, setIsRiwayatAvailable] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Riwayat" />
      </View>

      <View style={styles.middleContainer}>
        {isRiwayatAvailable === false ? (
          <View
            style={{
              height: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmptyTransaction />
          </View>
        ) : (
          <View style={{ width: "100%" }}>
            <View style={styles.filterDownload}>
              <FontAwesome
                name="filter"
                size={24}
                color={colors.primary.primaryOne}
              />
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="file-download"
                  size={24}
                  color={colors.primary.primaryOne}
                />
                <BodySmallText style={{ color: colors.primary.primaryOne }}>
                  Download
                </BodySmallText>
              </TouchableOpacity>
            </View>
            <View style={styles.daftarTransaksi}>
              <BodyLargeText>There is a transaction</BodyLargeText>
            </View>
          </View>
        )}
      </View>

      <View style={styles.bottomContainer}></View>
    </View>
  );
};

export default ValasRiwayatScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "15%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
  },
  filterDownload: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  daftarTransaksi: {
    paddingHorizontal: 20,
  },
});

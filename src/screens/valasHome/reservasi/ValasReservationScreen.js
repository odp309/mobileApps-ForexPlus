import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import colors from "../../../theme/colors";
import { BodySmallText } from "../../../components/shared/StyledText";

const dummyData = [
  {
    cabang: "BNI Cabang 1 (Surabaya)",
    tanggal: "7 September 2024",
    status: "Terjadwal",
    kode: "RES140524003",
  },
  {
    cabang: "BNI Cabang 1 (Depok)",
    tanggal: "13 Agustus 2024",
    status: "Terjadwal",
    kode: "RES140524002",
  },
  {
    cabang: "BNI Cabang 1 (Jakarta Barat)",
    tanggal: "28 Juni 2024",
    status: "Terjadwal",
    kode: "RES140524001",
  },
];

const ValasReservationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Daftar Reservasi" />
      </View>
      <View style={{ paddingLeft: 23, paddingRight: 22 }}>
        {dummyData.map((item) => (
          <View style={styles.bottonContainer} key={item.id}>
            <View style={styles.containerCabang}>
              <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
                {item.cabang}
              </BodySmallText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.containerTglJam, styles.addRightBorder]}>
                <BodySmallText style={{ color: colors.color.grey }}>
                  Tanggal
                </BodySmallText>
                <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
                  {item.tanggal}
                </BodySmallText>
              </View>
              <View style={styles.containerTglJam}>
                <BodySmallText style={{ color: colors.color.grey }}>
                  Status Reservasi
                </BodySmallText>
                <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
                  {item.status}
                </BodySmallText>
              </View>
            </View>
            <View style={styles.containerStatus}>
              <BodySmallText style={{ color: colors.color.grey }}>
                Kode Reservasi
              </BodySmallText>
              <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
                {item.kode}
              </BodySmallText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ValasReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    color: colors.color.black,
  },
  topContainer: {
    width: "100%",
    marginTop: "12%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottonContainer: {
    width: "100%",
    backgroundColor: colors.primary.primaryThree,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
  },
  containerTglJam: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "50%",
    backgroundColor: colors.color.white,
  },
  addRightBorder: {
    borderRightWidth: 1,
    borderColor: colors.primary.primaryThree,
  },
  containerCabang: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  containerStatus: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.color.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopWidth: 1,
    borderColor: colors.primary.primaryThree,
  },
});

import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import colors from "../../../theme/colors";
import { BodyRegularText, BodySmallText } from "../../../components/shared/StyledText";
import { useRoute } from "@react-navigation/core";

const dummyData = [
  {
    id : "1",
    cabang: "BNI Cabang 1 (Surabaya)",
    tanggal: "7 September 2024",
    status: "Terjadwal",
    kode: "RES140524003",
  },
  {
    id : "2",
    cabang: "BNI Cabang 1 (Depok)",
    tanggal: "13 Agustus 2024",
    status: "Terjadwal",
    kode: "RES140524002",
  },
  {
    id : "3",
    cabang: "BNI Cabang 1 (Jakarta Barat)",
    tanggal: "28 Juni 2024",
    status: "Terjadwal",
    kode: "RES140524001",
  },
];

const ValasReservationScreen = () => {
  const route = useRoute();
  const reservation = route.params?.reservation;
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader  />
      </View>
       <View style={{alignItems:"center"}}>
        <BodyRegularText>{reservation.reservationNumber}</BodyRegularText>
        <BodyRegularText>{reservation.amount}</BodyRegularText>
        <BodyRegularText>{reservation.reservationDate}</BodyRegularText>
        <BodyRegularText>KCP {reservation.branchName}</BodyRegularText>
        <BodyRegularText>{reservation.branchAddress}</BodyRegularText>
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

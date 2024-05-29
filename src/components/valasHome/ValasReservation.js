import { StyleSheet, Text, View } from "react-native";
import { BodySmallText } from "../shared/StyledText";
import colors from "../../theme/colors";

const dummyData = {
  cabang: "BNI Cabang 1 (Jakarta Barat)",
  tanggal: "28 Juni 2024",
  jam: "08.10 - 08.30",
  status: "Terjadwal",
};

const ValasReservation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerCabang}>
        <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
          {dummyData.cabang}
        </BodySmallText>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.containerTglJam, styles.addRightBorder]}>
          <BodySmallText style={{ color: colors.color.grey }}>
            Tanggal
          </BodySmallText>
          <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
            {dummyData.tanggal}
          </BodySmallText>
        </View>
        <View style={styles.containerTglJam}>
          <BodySmallText style={{ color: colors.color.grey }}>
            Jam
          </BodySmallText>
          <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
            {dummyData.jam}
          </BodySmallText>
        </View>
      </View>
      <View style={styles.containerStatus}>
        <BodySmallText style={{ color: colors.color.grey }}>
          Status Reservasi
        </BodySmallText>
        <BodySmallText style={{ color: colors.secondary.secondaryOne }}>
          {dummyData.status}
        </BodySmallText>
      </View>
    </View>
  );
};

export default ValasReservation;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: colors.primary.primaryThree,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    elevation: 5, // This is the elevation for the drop shadow
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

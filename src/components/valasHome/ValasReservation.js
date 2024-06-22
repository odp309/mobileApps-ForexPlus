import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BodyMediumText, BodySmallText } from "../shared/StyledText";
import colors from "../../theme/colors";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigation } from "@react-navigation/native";
 
const ValasReservation = ({ reservation }) => {
  const navigation = useNavigation();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  return (
    <Pressable
      activeOpacity={true}
      onPress={() =>
        navigation.navigate("ValasReservation", { reservation: reservation })
      }
    >
      <View style={styles.container}>
        <View style={styles.containerCabang}>
          <BodyMediumText style={{ color: colors.color.black }}>
            BNI Cabang {reservation.branchName}
          </BodyMediumText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.containerTglJam, styles.addRightBorder]}>
            <BodyMediumText style={{ color: colors.color.grey, fontSize: 15 }}>
              Tanggal
            </BodyMediumText>
            <BodyMediumText style={{ color: colors.color.black, fontSize: 15 }}>
              {formatDate(reservation.reservationDate)}
            </BodyMediumText>
          </View>
          <View style={styles.containerTglJam}>
            <BodyMediumText style={{ color: colors.color.grey, fontSize: 15 }}>
              Status Reservasi
            </BodyMediumText>
            <BodyMediumText style={{ color: colors.color.black, fontSize: 15 }}>
              {reservation.status}
            </BodyMediumText>
          </View>
        </View>
        <View style={styles.containerStatus}>
          <BodyMediumText style={{ color: colors.color.grey, fontSize: 15 }}>
            Kode Reservasi
          </BodyMediumText>
          <BodyMediumText style={{ color: colors.color.black, fontSize: 15 }}>
            {reservation.reservationNumber}
          </BodyMediumText>
        </View>
      </View>
    </Pressable>
  );
};

export default ValasReservation;

const styles = StyleSheet.create({
  container: {
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

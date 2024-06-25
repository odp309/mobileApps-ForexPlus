import { StyleSheet, View } from "react-native";
import { BodyMediumText } from "../../shared/StyledText"; 
import colors from "../../../theme/colors";
import { formatCurrencyNumber, formatNumber } from "../../../config/SharedConfig";

const MONTHS_NAME = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const JualBeliSecondContent = ({
  trxType,
  createdDate,
  trxId,
  currencyCode,
  kurs,
  paidPrice,
}) => {
  const convertDate = (date) => {
    const newDate = new Date(date);
    const dateFormat = `${newDate.getDate()} ${
      MONTHS_NAME[newDate.getMonth()]
    } ${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}`;

    return dateFormat;
  };

  const splitTransactionID = (id) => {
    const idArray = id.split('-');
    return idArray[idArray.length-1];
  }

  return (
    <View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          {trxType === "Beli" ? (
            <View>
              <BodyMediumText style={{ color: colors.color.grey }}>
                Nominal Pembayaran
              </BodyMediumText>
            </View>
          ) : (
            <BodyMediumText style={{ color: colors.color.grey }}>
              Nominal Penjualan
            </BodyMediumText>
          )}
          <BodyMediumText>Rp. {formatNumber(paidPrice)}</BodyMediumText>
        </View>

        <View style={styles.textContainer}>
          {trxType === "Beli" ? (
            <View>
              <BodyMediumText style={{ color: colors.color.grey }}>
                {" "}
                Kurs Beli{" "}
              </BodyMediumText>
            </View>
          ) : (
            <View>
              <BodyMediumText style={{ color: colors.color.grey }}>
                {" "}
                Nilai Tukar{" "}
              </BodyMediumText>
            </View>
          )}
          <BodyMediumText>
            {currencyCode} 1 = Rp {formatCurrencyNumber(kurs)}
          </BodyMediumText>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <BodyMediumText style={{ color: colors.color.grey }}>
            Tanggal Transaksi
          </BodyMediumText>
          <BodyMediumText>{convertDate(createdDate)}</BodyMediumText>
        </View>

        <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              ID Transaksi
            </BodyMediumText>
            <BodyMediumText>{splitTransactionID(trxId)}</BodyMediumText>
          </View>
      </View>
    </View>
  );
};

export default JualBeliSecondContent;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: colors.color.lightGrey,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
});

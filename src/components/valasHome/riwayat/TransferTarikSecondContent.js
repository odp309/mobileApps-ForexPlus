import { StyleSheet, View } from "react-native";
import { BodyMediumText } from "../../shared/StyledText";
import colors from "../../../theme/colors";

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

const TransferTarikSecondContent = ({
  trxId,
  trxType,
  createdDate,
  reservationCode,
  detail,
  tarikStatus,
  reservationDate
}) => {
  const convertDate = (date) => {
    const newDate = new Date(date);
    const dateFormat = `${newDate.getDate()} ${
      MONTHS_NAME[newDate.getMonth()]
    } ${newDate.getFullYear()}`;
    return dateFormat;
  };

  const splitTransactionID = (id) => {
    const idArray = id.split("-");
    return idArray[idArray.length - 1];
  };

  const getLocation = (detail) => {
    const splitDetail = detail.split("/");
    return splitDetail[2];
  };

  const getTransferName = (detail) => {
    const splitDetail = detail.split("/");
    return splitDetail[2];
  };

  const getRefund = (detail) => {
    const splitDetail = detail.split("/");
    return splitDetail[0];
  };

  return (
    <View>
      {trxType === "Transfer" ? (
        <View>
          {/* Nama Penerima */}
          <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              Nama Penerima{" "}
            </BodyMediumText>
            <BodyMediumText>{getTransferName(detail)}</BodyMediumText>
          </View>

          {/* Tanggal Transaksi */}
          <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              Tanggal Transaksi
            </BodyMediumText>
            <BodyMediumText>{convertDate(createdDate)}</BodyMediumText>
          </View>

          {/* ID Transaksi */}
          <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              ID Transaksi
            </BodyMediumText>
            <BodyMediumText>{splitTransactionID(trxId)}</BodyMediumText>
          </View>
        </View>
      ) : trxType === "Pengembalian Dana" ? (
        <View style={styles.contentContainer}>
          {/* Jenis Transaksi */}
          <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              Jenis Transaksi{" "}
            </BodyMediumText>
            <BodyMediumText>{getRefund(detail)}</BodyMediumText>
          </View>

          {/* Tanggal Transaksi */}
          <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              Tanggal Transaksi
            </BodyMediumText>
            <BodyMediumText>{convertDate(createdDate)}</BodyMediumText>
          </View>

          {/* ID Transaksi */}
          <View style={styles.textContainer}>
            <BodyMediumText style={{ color: colors.color.grey }}>
              ID Transaksi
            </BodyMediumText>
            <BodyMediumText>{splitTransactionID(trxId)}</BodyMediumText>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.contentContainer}>
            {/* Kode Reservasi */}
            <View style={styles.textContainer}>
              <BodyMediumText style={{ color: colors.color.grey }}>
                Kode Reservasi
              </BodyMediumText>
              <BodyMediumText>{reservationCode}</BodyMediumText>
            </View>

            {/* Kantor Penarikan */}
            <View style={styles.textContainer}>
              <BodyMediumText style={{ color: colors.color.grey }}>
                Kantor Penarikan
              </BodyMediumText>
              <BodyMediumText>{getLocation(detail)}</BodyMediumText>
            </View>

            {/* Tanggal Reservasi */}
            <View style={styles.textContainer}>
              <BodyMediumText style={{ color: colors.color.grey }}>
                Tanggal Reservasi
              </BodyMediumText>
              <BodyMediumText>{convertDate(reservationDate)}</BodyMediumText>
            </View>
          </View>

          {trxType === "Tarik" ? (
            <View style={styles.contentContainer}>
              {/* Tanggal Reservasi */}
              <View style={styles.textContainer}>
                <BodyMediumText style={{ color: colors.color.grey }}>
                  Status
                </BodyMediumText>
                <BodyMediumText>{tarikStatus}</BodyMediumText>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default TransferTarikSecondContent;

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

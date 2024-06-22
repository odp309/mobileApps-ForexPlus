import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodySmallText,
  BodyMediumText,
  BodyMediumTextSemiBold,
  BodyLargeText,
  BodyRegularText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import DetailHistoryHeader from "../../../components/valasHome/valasHistory/DetailHistoryHeader";
import { fetchHistoryDetail } from "../../../config/ValasConfig";
import JualBeliSecondContent from "../../../components/valasHome/riwayat/JualBeliSecondContent";
import TransferTarikSecondContent from "../../../components/valasHome/riwayat/TransferTarikSecondContent";

const DetailHistoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [transactionDetails, setTransactionDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const setFetchHistoryDetail = async () => {
    try {
      const details = await fetchHistoryDetail(route.params?.item.trxId);
      console.log("details:");
      console.log(details);
      setTransactionDetails(details);
    } catch (error) {
      console.error("Fetch History Details failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("transactionDetails.operationType ");
    console.log(transactionDetails.operationType);
    setTimeout(() => {
      setFetchHistoryDetail();
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={`${transactionDetails.trxType} Valas`} />
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.iconContainer}>
          {transactionDetails.trxType === "Jual" ? (
            <Image
              source={{ uri: "https://imgur.com/BesM5FH.png" }}
              style={styles.icon}
            />
          ) : transactionDetails.trxType === "Beli" ? (
            <Image
              source={{ uri: "https://imgur.com/Z55cosA.png" }}
              style={styles.icon}
            />
          ) : transactionDetails.trxType === "Tarik" ? (
            <Image
              source={{ uri: "https://imgur.com/tnZmAqJ.png" }}
              style={styles.icon}
            />
          ) : (
            //Transfer
            <Image
              source={{ uri: "https://imgur.com/tnZmAqJ.png" }}
              style={styles.icon}
            />
          )}
          <BodyLargeText style={{ marginLeft: 20 }}>
            {transactionDetails.trxType}
            {/* {transactionDetails.trxType === "Tarik" ? (
              <BodyLargeText>
                {"("}
                {transactionDetails.status}
                {")"}
              </BodyLargeText>
            ) : null} */}
          </BodyLargeText>
          {/* {
            transactionDetails.status != null ?
            <BodyRegularText style={{
              color: colors.color.success,
            }}>
               {"("}
               {transactionDetails.status}
               {")"}
            </BodyRegularText>
            : null
          } */}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.detailContainer}>
            {transactionDetails.trxType === "Beli" ? (
              <BodyMediumText style={{ color: colors.color.grey }}>
                Nominal Pembelian
              </BodyMediumText>
            ) : transactionDetails.trxType === "Jual" ? (
              <BodyMediumText style={{ color: colors.color.grey }}>
                Nominal Penjualan
              </BodyMediumText>
            ) : transactionDetails.trxType === "Transfer" ? (
              <BodyMediumText style={{ color: colors.color.grey }}>
                Nominal Transfer
              </BodyMediumText>
            ) : (
              //Tarik
              <BodyMediumText style={{ color: colors.color.grey }}>
                Nominal Penarikan
              </BodyMediumText>
            )}

            <BodyMediumText style={styles.textCurrency}>
              {transactionDetails.trxType === "Beli" ||
              transactionDetails.status === "Kadaluwarsa" ||
              transactionDetails.trxType === "Pengembalian Dana" ||
              (transactionDetails.operationType === "K" &&
                transactionDetails.trxType != "Jual") ? (
                <BodyMediumTextSemiBold style={styles.txtAmountPlus}>
                  + {transactionDetails.currencyCode}{" "}
                  {transactionDetails.amount}
                </BodyMediumTextSemiBold>
              ) : (
                <BodyMediumTextSemiBold style={styles.txtAmountMinus}>
                  - {transactionDetails.currencyCode}{" "}
                  {transactionDetails.amount}
                </BodyMediumTextSemiBold>
              )}
            </BodyMediumText>
          </View>
        </View>

        {transactionDetails.trxType === "Beli" ||
        transactionDetails.trxType === "Jual" ? (
          <JualBeliSecondContent
            trxType={transactionDetails.trxType}
            createdDate={transactionDetails.createdDate}
            trxId={transactionDetails.trxId}
            currencyCode={transactionDetails.currencyCode}
            kurs={transactionDetails.kurs}
            paidPrice={transactionDetails.paidPrice}
          />
        ) : (
          <TransferTarikSecondContent
            trxId={transactionDetails.trxId}
            trxType={transactionDetails.trxType}
            createdDate={transactionDetails.createdDate}
            reservationCode={transactionDetails.reservationCode}
            detail={transactionDetails.detail}
            tarikStatus={transactionDetails.status}
            reservationDate={transactionDetails.reservationDate}
          />
        )}
      </View>
    </View>
  );
};

export default DetailHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // padding: 20
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 0.15,
  },
  middleContainer: {
    flex: 0.85,
    paddingHorizontal: 20,
  },
  contentContainer: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: colors.color.lightGrey,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 16,
    backgroundColor: colors.color.lightGrey,
    borderRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 10,
  },
  textCurrency: {
    color: "green",
    fontWeight: "bold",
  },
  txtAmountMinus: {
    textAlign: "right",
    fontWeight: "bold",
    color: colors.primary.primaryOne,
  },
  txtAmountPlus: {
    textAlign: "right",
    fontWeight: "bold",
    color: colors.secondary.secondaryOne,
  },
});

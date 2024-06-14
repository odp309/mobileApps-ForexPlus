import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BodyXLTextBold,
  BodySmallText,
  BodyMediumTextSemiBold,
  BodyLargeText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { Icon } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HistoryHeader from "../../../components/valasHome/valasHistory/HistoryHeader";
import { fetchHistory, formatNumber } from "../../../config/ValasConfig";

const DIMENSION_HEIGHT = Dimensions.get("screen").height;

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

const HistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [transactionPerMonth, setTransactionPerMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedWallet = route.params?.selectedWallet;

  const convertDate = (date) => {
    const newDate = new Date(date);
    const dateFormat = `${newDate.getDate()} ${
      MONTHS_NAME[newDate.getMonth()]
    } ${newDate.getFullYear()}`;
    return dateFormat;
  };
  const convertDateTitle = (date) => {
    const newDate = new Date(date);
    const dateFormat = `${
      MONTHS_NAME[newDate.getMonth()]
    } ${newDate.getFullYear()}`;
    return dateFormat;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("DetailHistory", { item });
      }}
    >
      <View style={styles.iconContainer}>
        {item.trxType === "Jual" ? (
          <Image
            source={{ uri: "https://imgur.com/BesM5FH.png" }}
            style={styles.icon}
          />
        ) : item.trxType === "Beli" ? (
          <Image
            source={{ uri: "https://imgur.com/Z55cosA.png" }}
            style={styles.icon}
          />
        ) : item.trxType === "Tarik" ? (
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
      </View>
      <View style={styles.textContainer}>
        <BodyMediumTextSemiBold style={styles.itemType}>
          {item.trxType}{" "}
          {item.status === "Sukses" ? (
            <BodySmallText style={{ color: colors.color.success }}>
              {"("}
              {item.status}
              {")"}
            </BodySmallText>
          ) : item.status === "Terjadwal" ? (
            <BodySmallText style={{ color: "#EB9647" }}>
              {"("}
              {item.status}
              {")"}
            </BodySmallText>
          ) : item.status != null ? (
            <BodySmallText style={{ color: colors.color.error }}>
              {"("}
              {item.status}
              {")"}
            </BodySmallText>
          ) : (
            <BodySmallText style={{ color: colors.color.error }}>
              {item.status}
            </BodySmallText>
          )}
        </BodyMediumTextSemiBold>
        <BodySmallText style={styles.itemDate}>
          {convertDate(item.createdDate)}
        </BodySmallText>
      </View>
      <View style={styles.amountContainer}>
        {item.trxType === "Beli" ||
        item.status === "Kadaluwarsa" ||
        item.trxType === "Pengembalian Dana" ? (
          <BodyMediumTextSemiBold
            style={{
              textAlign: "right",
              fontWeight: "bold",
              color: colors.secondary.secondaryOne,
            }}
          >
            + {item.currencyCode} {formatNumber(item.amount)}
          </BodyMediumTextSemiBold>
        ) : (
          <BodyMediumTextSemiBold
            style={{
              textAlign: "right",
              fontWeight: "bold",
              color: colors.primary.primaryOne,
            }}
          >
            - {item.currencyCode} {formatNumber(item.amount)}
          </BodyMediumTextSemiBold>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderMonth = ({ item }) => {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <BodyLargeText style={{ fontWeight: "bold" }}>
            {convertDateTitle(item.month)}
          </BodyLargeText>
        </View>
        <FlatList
          data={item.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.trxId}
        />
      </View>
    );
  };

  const getListYearMonth = (history) => {
    const listYearMonth = [];
    history.forEach((transaction) => {
      const date = transaction.createdDate.slice(0, 7);
      if (listYearMonth.length === 0 || !listYearMonth.includes(date)) {
        listYearMonth.push(date);
      }
    });

    for (let i = 0; i < listYearMonth.length; i++) {
      const thisMonthTransaction = history.filter((item) =>
        item.createdDate.includes(listYearMonth[i])
      );
      console.log("thisMonthTransaction:");
      console.log(thisMonthTransaction);
      setTransactionPerMonth([
        ...transactionPerMonth,
        {
          id: i.toString(),
          month: listYearMonth[i],
          data: thisMonthTransaction,
        },
      ]);
    }
  };

  const setFetchHistory = async () => {
    try {
      const history = await fetchHistory(selectedWallet.walletId);
      getListYearMonth(history);
    } catch (error) {
      console.error("Fetch History failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFetchHistory();
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
        <HistoryHeader title={"Riwayat"} hasrightIcon={true} />
      </View>
      <View style={styles.middleContainer}>
        <FlatList
          data={transactionPerMonth}
          renderItem={renderMonth}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 1.05,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    marginTop: "10%",
    marginBottom: "10%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    paddingHorizontal: 17,
    marginBottom: "10%",
  },
  sectionHeader: {
    // fontSize: 18,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.color.lightGrey,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.primaryThree,
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 0.2,
  },
  textContainer: {
    flex: 0.5,
  },
  amountContainer: {
    flex: 0.3,
  },
  itemType: {
    textAlign: "left",
  },
  itemDate: {
    textAlign: "left",
    color: colors.color.lightGrey,
  },
  icon: {
    width: 50,
    height: 50,
    // marginRight: 10,
  },
  itemAmount: {
    // flex: 0.2,
    textAlign: "right",
    marginRight: 10,
  },
});

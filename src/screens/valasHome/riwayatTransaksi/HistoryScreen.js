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
import EmptyTransaction from "../../../components/valasHome/riwayat/EmptyTransaction";
import FilterModal from "../../../components/valasHome/riwayat/FilterModal";

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
  const [allTransaction, setAllTransaction] = useState(null);
  const [tempTransaction, setTempTransaction] = useState([]);
  const [emptyTransaction, setEmptyTransaction] = useState(null);
  // const [filter, setFilter] = useState(null);
  // const [listKey, setListKey] = useState("initialKey"); // Unique key for FlatList
  const [isLoading, setIsLoading] = useState(true);
  const [isModalShown, setIsModalShown] = useState(false);
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
          {item.trxType}
          {/* {item.status === "Sukses" ? (
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
          )} */}
        </BodyMediumTextSemiBold>
        <BodySmallText style={styles.itemDate}>
          {convertDate(item.createdDate)}
        </BodySmallText>
      </View>
      <View style={styles.amountContainer}>
        {item.trxType === "Beli" ||
        item.status === "Kadaluwarsa" ||
        item.trxType === "Pengembalian Dana" ||
        (item.operationType === "K" && item.trxType !="Jual") ? (
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

  const acceptFilter = (data) => {
    // console.log("accept filter data:");
    // console.log(data);

    const ed = new Date().getTime();
    const sd = new Date(data.range).getTime();
    const result = allTransaction.filter((d) => {
      let time = new Date(d.createdDate).getTime();
      return sd < time && time < ed && d.trxType === data.type;
    });
    console.log("Result: ", result);
    if (result.length > 0) {
      getListYearMonth(result);
    } else {
      setTempTransaction([]);
    }
  };

  const getListYearMonth = (history) => {
    const listYearMonth = [];
    history.forEach((transaction) => {
      const date = transaction.createdDate.slice(0, 7);
      if (listYearMonth.length === 0 || !listYearMonth.includes(date)) {
        listYearMonth.push(date);
      }
    });
    console.log("transactionPermonth: ", transactionPerMonth.length);
    for (let i = 0; i < listYearMonth.length; i++) {
      const thisMonthTransaction = history.filter((item) =>
        item.createdDate.includes(listYearMonth[i])
      );
      console.log("thisMonthTransaction ascending:");
      console.log(thisMonthTransaction);
      const reverseList = thisMonthTransaction.reverse();
      console.log("thisMonthTransaction descending:");
      console.log(reverseList);
      setTransactionPerMonth([
        ...transactionPerMonth,
        {
          id: i.toString(),
          month: listYearMonth[i],
          data: reverseList,
        },
      ]);
      console.log("Transaction per month : ", transactionPerMonth);
    }
  };

  const setFetchHistory = async () => {
    try {
      const history = await fetchHistory(selectedWallet.walletId);
      const descendList = history.reverse();
      getListYearMonth(history);
      setAllTransaction(descendList);
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

  const toggleBottomSheet = () => {
    setIsModalShown(!isModalShown);
    setTempTransaction(transactionPerMonth);
    setTransactionPerMonth([]);
  };

  const closeModal = () => {
    setIsModalShown(!isModalShown);
  };

  // ----------------------- Main Screen -----------------------
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <HistoryHeader
          title={"Riwayat"}
          hasrightIcon={true}
          toggleBottomSheet={toggleBottomSheet}
        />
      </View>
      <View style={styles.middleContainer}>
        {transactionPerMonth.length > 0 ? (
          <FlatList
            data={transactionPerMonth}
            renderItem={renderMonth}
            keyExtractor={(item) => item.id}
          />
        ) : tempTransaction.length > 0 ? (
          <FlatList
            data={tempTransaction}
            renderItem={renderMonth}
            keyExtractor={(item) => item.id}
          />
        ) : transactionPerMonth.length === 0 ? (
          <EmptyTransaction />
        ) : (
          <EmptyTransaction />
        )}
        <FilterModal
          isModalShown={isModalShown}
          toggleBottomSheet={closeModal}
          handleFilter={acceptFilter}
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

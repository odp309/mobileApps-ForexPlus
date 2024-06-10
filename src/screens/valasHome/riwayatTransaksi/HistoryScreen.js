import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  BodyXLTextBold,
  BodySmallText,
  BodyMediumTextSemiBold,
} from "../../../components/shared/StyledText";
import { Icon } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HistoryHeader from "../../../components/valasHome/valasHistory/HistoryHeader";

const DIMENSION_HEIGHT = Dimensions.get("screen").height;

const HistoryScreen = () => {
  const navigation = useNavigation();

  const data = [
    {
      id: "1",
      type: "Tarik",
      status: "(terjadwal)",
      date: "26 Mei 2024",
      amount: "- AUD 1",
      color: "orange",
      icon: require("../../../../assets/icon-histori-tarik.png"),
    },
    {
      id: "3",
      type: "Tarik",
      status: "(dibatalkan)",
      date: "26 Mei 2024",
      amount: "+ AUD 1",
      color: "red",
      icon: require("../../../../assets/icon-histori-tarik.png"),
    },
    {
      id: "2",
      type: "Tarik",
      status: "(selesai)",
      date: "26 Mei 2024",
      amount: "- AUD 1",
      color: "green",
      icon: require("../../../../assets/icon-histori-tarik.png"),
    },
    {
      id: "4",
      type: "Jual",
      date: "26 Mei 2024",
      amount: "- AUD 1",
      color: "orange",
      icon: require("../../../../assets/icon-histori-jual.png"),
    },
    {
      id: "5",
      type: "Beli",
      date: "20 Mei 2024",
      amount: "+ AUD 1",
      color: "purple",
      icon: require("../../../../assets/icon-histori-beli.png"),
    },
    {
      id: "6",
      type: "Transfer",
      date: "14 Mei 2024",
      amount: "- AUD 1",
      color: "blue",
      icon: require("../../../../assets/icon-histori-transfer.png"),
    },
    {
      id: "7",
      type: "Beli",
      date: "20 April 2024",
      amount: "+ AUD 1",
      color: "purple",
      icon: require("../../../../assets/icon-histori-beli.png"),
    },
    {
      id: "8",
      type: "Transfer",
      date: "14 April 2024",
      amount: "+ AUD 1",
      color: "blue",
      icon: require("../../../../assets/icon-histori-transfer.png"),
    },
    {
      id: "9",
      type: "Beli",
      date: "8 April 2024",
      amount: "+ AUD 1",
      color: "purple",
      icon: require("../../../../assets/icon-histori-beli.png"),
    },
    {
      id: "10",
      type: "Beli",
      date: "5 April 2024",
      amount: "+ AUD 1",
      color: "purple",
      icon: require("../../../../assets/icon-histori-beli.png"),
    },
    {
      id: "11",
      type: "Beli",
      date: "1 April 2024",
      amount: "+ AUD 1",
      color: "purple",
      icon: require("../../../../assets/icon-histori-beli.png"),
    },
  ];
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("DetailRiwayat", { item })}
    >
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemType}>
          {item.type} <Text style={{ color: item.color }}>{item.status}</Text>
        </Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
      <BodyMediumTextSemiBold
        style={[
          styles.itemAmount,
          { color: item.amount.startsWith("+") ? "green" : "red" },
        ]}
      >
        {item.amount}
      </BodyMediumTextSemiBold>
    </TouchableOpacity>
  );
  const meiData = data.filter((item) => item.date.includes("Mei 2024"));
  const aprilData = data.filter((item) => item.date.includes("April 2024"));
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <HistoryHeader title={"Riwayat"} hasrightIcon={true} />
      </View>

      <ScrollView>
        <View style={styles.middleContainer}>
          <FlatList
            scrollEnabled={false}
            data={meiData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <Text style={styles.sectionHeader}>Mei 2024</Text>
            )}
          />
          <FlatList
            scrollEnabled={false}
            data={aprilData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <Text style={styles.sectionHeader}>April 2024</Text>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
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
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 0.2,
  },
  textContainer: {
    flex: 0.6,
  },
  itemType: {
    textAlign: "left",
  },
  itemDate: {
    textAlign: "left",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemAmount: {
    flex: 0.2,
    textAlign: "right",
    marginRight: 10,
  },
});

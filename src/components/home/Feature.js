import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { BodyMediumText, BodySmallText } from "../shared/StyledText";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const Feature = () => {
  const dataFitur = [
    {
      id: "1",
      title: "Transfer",
      icon: require("../../../assets/icon-transfer.png"),
    },
    {
      id: "2",
      title: "E-Wallet",
      icon: require("../../../assets/icon-e-wallet.png"),
    },
    {
      id: "3",
      title: "Pembayaran",
      icon: require("../../../assets/icon-pembayaran.png"),
    },
    {
      id: "4",
      title: "Valas Plus",
      icon: require("../../../assets/icon-valas-plus.png"),
    },
    {
      id: "5",
      title: "Pembelian",
      icon: require("../../../assets/icon-pembelian.png"),
    },
    {
      id: "6",
      title: "Life Goals",
      icon: require("../../../assets/icon-life-goals.png"),
    },
    {
      id: "7",
      title: "DiKado",
      icon: require("../../../assets/icon-dikado.png"),
    },
    {
      id: "8",
      title: "Credit Card",
      icon: require("../../../assets/icon-my-credit-card.png"),
    },
    {
      id: "9",
      title: "Rekeningku",
      icon: require("../../../assets/icon-rekeningku.png"),
    },
    {
      id: "10",
      title: "Mobile Tunai",
      icon: require("../../../assets/icon-mobile-tunai.png"),
    },
  ];
  const numColumns = 4;
  const [showAll, setShowAll] = useState(false);

  const formatData = (dataFitur, numColumns) => {
    const numberOfFullRows = Math.floor(dataFitur.length / numColumns);
    let numberOfElementsLastRow =
      dataFitur.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      dataFitur.push({ key: `Blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow += 1;
    }
    return dataFitur;
  };

  const isiElement = ({ item }) => (
    <View
      style={{
        alignItems: "center",
        minWidth: 75,
        marginVertical: 5,
      }}
    >
      <TouchableOpacity>
        <Image
          style={{ width: 60, height: 60, marginBottom: 5 }}
          source={item.icon}
        />
      </TouchableOpacity>

      <BodySmallText style={{ fontSize: 13 }}>{item.title}</BodySmallText>
    </View>
  );

  const handlePress = () => {
    const customAnimationConfig = {
      duration: 200,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    LayoutAnimation.configureNext(customAnimationConfig);
    setShowAll(!showAll);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <View style={styles.borderedObject}>
          <BodySmallText>
            <BodySmallText style={styles.textOrange}>POIN</BodySmallText>
            {"  "}500
          </BodySmallText>
        </View>
        <View style={[styles.borderedObject, { borderWidth: 2 , paddingHorizontal:10}]}>
          <Ionicons name="pencil" size={16} color={colors.primary.primaryOne} />
          <BodySmallText style={styles.textOrange}>Atur Menu</BodySmallText>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <FlatList
          numColumns={numColumns}
          data={
            showAll
              ? formatData(dataFitur, numColumns)
              : formatData(dataFitur.slice(0, 8), numColumns)
          }
          renderItem={isiElement}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-around" }}
        />
        <View style={{ width: "100%", height: 1, backgroundColor: "orange" }} />
        <View>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <BodyMediumText>
              {showAll ? "View Less" : "View All"}
            </BodyMediumText>
            <Ionicons
              name={showAll ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
              color={"#000"}
              style={{ marginLeft: 5, height: "100%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Feature;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
  },
  borderedObject: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.primary.primaryOne,
    paddingHorizontal: 15,
    paddingVertical: 2,
    textAlign: "center",
  },
  textOrange: {
    color: colors.primary.primaryOne,
  },
});

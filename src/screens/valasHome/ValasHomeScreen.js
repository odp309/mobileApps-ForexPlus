import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../theme/colors";
import ValasHeader from "../../components/valasHome/ValasHeader";
import { BodyMediumText, BodySmallText } from "../../components/shared/StyledText";
import ValasFeatures from "../../components/valasHome/ValasFeatures";
import ValasReservation from "../../components/valasHome/ValasReservation";
import WalletCard from "../../components/valasHome/WalletCard";
import ValasWalletNavigation from "../../components/valasHome/ValasWalletNavigation";
import DaftarRekening from "../../components/valasHome/DaftarRekening";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const ValasHomeScreen = () => {
  const dummyData = [
    { id: "1", valas: "SGD", totalValue: 1000, isChosen: true },
    { id: "2", valas: "AUD", totalValue: 500, isChosen: false },
    { id: "3", valas: "JPY", totalValue: 10000, isChosen: false },
  ];
  const [walletsData, setWalletsData] = useState(dummyData);
  const [chosenValas, setChosenValas] = useState("SGD");

  const handleNavData = (data) => {
    setChosenValas(data.valas);
    setWalletsData(
      walletsData.map((item) =>
        item.id === data.id
          ? { ...item, isChosen: true }
          : { ...item, isChosen: false }
      )
    );
  };

  const data = [
    { id: "1", view: () => <DaftarRekening /> },
    {
      id: "2",
      view: () => (
        <ValasWalletNavigation
          walletsData={walletsData}
          onNavChange={handleNavData}
        />
      ),
    },
    {
      id: "3",
      view: () => (
        <WalletCard valasType={chosenValas} />
      ),
    },
    { id: "4", view: () => <ValasFeatures /> },
    {
      id: "5",
      view: () => (
        <View
          style={{
            width: "100%",
            paddingLeft: 10,
            paddingTop: 10,
            borderTopWidth: 4,
            borderTopColor: colors.primary.primaryThree,
          }}
        >
          <BodyMediumText style={{ color: colors.color.grey }}>
            Daftar Reservasi Tarik
          </BodyMediumText>
        </View>
      ),
    },
    { id: "6", view: () => <ValasReservation /> },
  ];

  const renderedView = ({ item }) => <View>{item.view()}</View>;

  return (
    <View style={styles.container}>
      <ValasHeader />

      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderedView}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ValasHomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "7%",
    paddingTop: "6%",
  },
  content: {
    top: 150,
    height: WINDOW_HEIGHT - 150,
  },
});

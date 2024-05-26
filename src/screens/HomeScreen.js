import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BodyRegularText } from "../components/shared/StyledText";
import Header from "../components/home/Header";
import HeaderProfile from "../components/home/HeaderProfile";
import Pocket from "../components/home/Pocket";
import Feature from "../components/home/Feature";
import PromoInformasi from "../components/home/PromoInformasi";

const data = [
  { id: "1", view: () => <Header /> },
  { id: "2", view: () => <HeaderProfile /> },
  { id: "3", view: () => <Pocket /> },
  { id: "4", view: () => <Feature /> },
  {
    id: "5",
    view: () => (
      <View>
        <View
          style={{ width: "100%", height: 6, backgroundColor: "#FDE7DF" }}
        />
        <PromoInformasi />
      </View>
    ),
  },
];

const renderedView = ({ item }) => <View>{item.view()}</View>;
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderedView}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "7%", 
  },
});

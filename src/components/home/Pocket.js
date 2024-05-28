import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { ImageComponent } from "react-native";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BodyMediumText, BodyRegularText } from "../shared/StyledText";

const { width } = Dimensions.get("window");
const dataPocket = [
  {
    id: "1",
    imgResource: require("../../../assets/poket.png"),
    saldo: "50.000.000",
    rekening: "19281918921",
    jenisRek: "TAPLUS PEGAWAI BNI",
  },
  {
    id: "2",
    imgResource: require("../../../assets/poketBlue.png"),
    saldo: "55.050.000",
    rekening: "1905995041",
    jenisRek: "TAPLUS PEGAWAI BNI",
  },
];

const ListPocket = ({ item, index }) => (
  <View>
    <ImageBackground
      resizeMode="stretch"
      source={item.imgResource}
      style={styles.cardContainer}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <BodyMediumText style={{ color: "white", fontSize: 28 }}>
          Rp{" "}
        </BodyMediumText>
        <BodyMediumText style={{ color: "white", fontSize: 28 }}>
          {item.saldo}
        </BodyMediumText>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={"#fff"}
          style={{ marginHorizontal: 10, height: "100%", marginTop: "3%" }}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ height: 24 }}>
          {index === dataPocket.length - 1 ? null : (
            <TouchableHighlight>
              <Ionicons name="caret-forward-outline" size={24} color={"#fff"} />
            </TouchableHighlight>
          )}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <BodyMediumText style={{ color: "white", fontSize: 20 }}>
          {item.rekening}
        </BodyMediumText>
        <Ionicons
          name="copy-outline"
          size={20}
          color={"#fff"}
          style={{ marginLeft: 5 }}
        />
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <BodyRegularText style={{ color: "white", fontSize: 18 }}>
          {item.jenisRek}
        </BodyRegularText>
      </View>
    </ImageBackground>
  </View>
);
const Pocket = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dataPocket}
        renderItem={({ item, index }) => (
          <ListPocket item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Pocket;

const styles = StyleSheet.create({
  container: {
    marginVertical: "2%",
    marginHorizontal: "5%",
  },
  cardContainer: {
    height: 180,
    width: width * 0.9,
    paddingTop: "10%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
});

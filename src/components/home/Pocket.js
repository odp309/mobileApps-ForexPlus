import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BodyMediumText, BodyRegularText } from "../shared/StyledText";
import { Skeleton } from "@rneui/themed";

const { width } = Dimensions.get("window");

const dataPocket = [
  {
    id: "1",
    imgResource: "https://i.imgur.com/sf6Di0f.png",
    saldo: "50.000.000",
    rekening: "19281918921",
    jenisRek: "TAPLUS PEGAWAI BNI",
  }, 
  {
    id: "2",
    imgResource: "https://i.imgur.com/AEaI34r.png",
    saldo: "55.050.000",
    rekening: "1905995041",
    jenisRek: "TAPLUS PEGAWAI BNI",
  },
];

const ListPocket = ({ item, index, user,cardWidth,wrapperWidth }) => {
  

  return (
    <View style={[styles.cardWrapper, { width: wrapperWidth }]}>
      {user === null ? (
        <Skeleton source={item.imgResource} style={[styles.cardContainer, { width: cardWidth }]} />
      ) : (
        <ImageBackground
          resizeMode="stretch"
          source={{ uri: item.imgResource }}
          style={[styles.cardContainer, { width: cardWidth }]}
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
            <View style={{ height: 15 }}>
               
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
      )}
    </View>
  );
};

const Pocket = ({ user }) => {
  const isSingleItem = dataPocket.length === 1;
  const cardWidth = isSingleItem ? width * 0.9 : width * 0.85;
  const wrapperWidth = isSingleItem ? width : width * 0.9;
  return (
    <View style={styles.container}>
      <FlatList
        data={dataPocket}
        renderItem={({ item, index }) => (
          <ListPocket item={item} index={index} user={user}  cardWidth={cardWidth} wrapperWidth={wrapperWidth} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true} 
        snapToInterval={width * 0.9} 
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: isSingleItem ? 0 : 10 }} 
      />
    </View>
  );
};

export default Pocket;

const styles = StyleSheet.create({
  container: {
    marginVertical: "2%",
  },
  cardWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    height: 160,
    paddingTop: "10%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
});

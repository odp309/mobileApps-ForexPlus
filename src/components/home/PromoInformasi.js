import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import {
  BodyMediumText,
  BodyRegularText,
  BodyRegularTextSemiBold,
} from "../shared/StyledText";
import { Skeleton } from "@rneui/base";

const PromoInformasi = ({ user }) => {
  const { width } = Dimensions.get("window");
  const dataPromo = [
    {
      id: "1",
      imgResource: require("../../../assets/iklan1.png"),
    },
    {
      id: "2",
      imgResource: require("../../../assets/iklan2.png"),
    },
  ];
  const ListPromoInformasi = ({ item }) => (
    <View>
      {user === null ? (
        <Skeleton style={styles.cardContainer} />
      ) : (
        <ImageBackground
          resizeMode="stretch"
          source={item.imgResource}
          style={styles.cardContainer}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        {user === null ? (
          <Skeleton width={150} height={20} />
        ) : (
          <BodyRegularTextSemiBold> Promo & Informasi</BodyRegularTextSemiBold>
        )}
      </View>
      <FlatList
        data={dataPromo}
        renderItem={({ item }) => (
          <ListPromoInformasi item={item} user={user} />
        )}
        keyExtractor={(item) => item.id}
        extraData={user}
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

export default PromoInformasi;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    marginHorizontal: "5%",
  },
  cardContainer: {
    height: 150,
    width: Dimensions.get("window").width * 0.9,
    paddingTop: "10%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
});

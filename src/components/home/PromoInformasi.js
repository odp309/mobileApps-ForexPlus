import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { 
  BodySmallTextSemiBold,
} from "../shared/StyledText";
import { Skeleton } from "@rneui/base";

const PromoInformasi = ({ user }) => {
  const { width } = Dimensions.get("window");
  const dataPromo = [
    {
      id: "1",
      imgResource: "https://i.imgur.com/qUsKMKd.png",
    },
    {
      id: "2",
      imgResource: "https://i.imgur.com/1220BQA.png",
    },
  ];
  const ListPromoInformasi = ({ item }) => (
    <View> 
        <ImageBackground
          resizeMode="stretch"
          source={{uri : item.imgResource}}
          style={styles.cardContainer}
        /> 
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}> 
          <BodySmallTextSemiBold> Promo & Informasi</BodySmallTextSemiBold> 
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
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom:60
  },
  cardContainer: {
    height: 150,
    width: Dimensions.get("window").width * 0.9,
    paddingTop: "10%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
});

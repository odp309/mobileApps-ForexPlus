import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageComponent } from "react-native";
import { ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BodyMediumText, BodyRegularText, BodyRegularTextSemiBold } from "../shared/StyledText";


const { width } = Dimensions.get('window');
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
      <ImageBackground
        resizeMode="stretch"
        source={item.imgResource}
        style={styles.cardContainer}
      > 
      </ImageBackground>
    </View>
  );
const PromoInformasi = () => {
  return (
    <View style={styles.container}>
        <View style={{marginBottom:10}}>
            <BodyRegularTextSemiBold> Promo & Informasi</BodyRegularTextSemiBold>
        </View>
      <FlatList
        data={dataPromo}
        renderItem={({ item }) => <ListPromoInformasi item={item} />}
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

export default PromoInformasi;

const styles = StyleSheet.create({
  container: {
    marginVertical: "5%",
    marginHorizontal: "5%",
  },
  cardContainer: {
    height: 150,
    width:Dimensions.get('window').width * 0.9, 
    paddingTop: "10%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",  
  },
});

import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
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
    <ImageBackground
      resizeMode="stretch"
      source={item.imgResource}
      style={styles.cardContainer}
    ></ImageBackground>
  </View>
);

const ValasPromo = () => {
  return (
    <View style={styles.container}>
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

export default ValasPromo;

const styles = StyleSheet.create({
  container: {
    marginBottom: "5%",
    marginHorizontal: "5%",
    height: 150
  },
  cardContainer: {
    height: 150,
    width: Dimensions.get("window").width * 0.9,
    paddingTop: "10%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
});

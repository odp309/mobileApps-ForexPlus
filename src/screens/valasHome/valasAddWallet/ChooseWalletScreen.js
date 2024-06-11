import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import { fetchKurs } from "../../../config/ValasConfig";
import { BodyLargeTextSemiBold } from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const ChooseWalletScreen = () => {
  const [valasList, setValasList] = useState(null);
  const [chosenValas, setChosenValas] = useState(null);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const data = await fetchKurs();
      setValasList(data);
    } catch (error) {
      console.error("Error di ChooseWalletScreen: " + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ValasItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FirstTopUp",  {item} );
      }}
      style={styles.itemContainer}
    >
      <Image
        source={{ uri: item.flagIcon }}
        style={{ width: 50, height: 50, marginRight: 20 }}
      />
      <BodyLargeTextSemiBold>{item.currencyName}</BodyLargeTextSemiBold>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Pilih Mata Uang Asing" />
      </View>
      <View style={styles.middleContainer}>
        <FlatList
          data={valasList}
          renderItem={ValasItem}
          keyExtractor={(item) => item.currencyCode}
        />
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

export default ChooseWalletScreen;

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.13,
    marginTop: "15%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.82,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.05,
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 20,
    marginHorizontal:20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.primaryTwo,
  },
});

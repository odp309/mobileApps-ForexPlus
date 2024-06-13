import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import { BodyMediumTextSemiBold, HeadingSixText } from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import BranchItem from "../../../components/valasHome/valasTarik/BranchItem";
import { useNavigation, useRoute } from "@react-navigation/native";
 

const ChooseBranchScreen = () => {
  const route = useRoute();
  const [inputBranch, setInputBranch] = useState("");
  const navigation = useNavigation();
  const {transactionData,location,getBranch} = route.params;

  const receiveBranchData = (branch) => {   
    navigation.navigate('ChooseDate',{transactionData,selectedBranch:branch});
  };

  // Branch Item for Flatlist
  const renderedView = ({ item }) => (
    <BranchItem data={item} handleOnPress={receiveBranchData} />
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Tarik Valas" />
      </View>

      <View style={styles.middleContainer}>
        {/* Title and SearchBar */}
        <View style={styles.titleSearchContainer}>
          <HeadingSixText
            style={{
              fontWeight: "bold",
              color: colors.primary.primaryOne,
              marginBottom: 10,
            }}
          >
            Pilih Cabang Penarikan
          </HeadingSixText>
          {/* Searchbar */}
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <FontAwesome name="search" size={24} color={colors.color.grey} />
            </View>
            <TextInput
              placeholder="Cari cabang..."
              value={inputBranch}
              onChangeText={setInputBranch}
            />
          </View>
        </View>

        {/* Bank Branch Flatlist */}
        <View>
          {getBranch.length > 0 ? (
            <FlatList
            data={getBranch}
            key={(item) => {
              item.id;
            }}
            renderItem={renderedView}
          />
          ):(
            <BodyMediumTextSemiBold style={{textAlign : "center"}}>DATA KOSONG</BodyMediumTextSemiBold>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

export default ChooseBranchScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "15%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
  },
  searchBar: {
    width: "100%",
    minHeight: 40,
    borderRadius: 15,
    backgroundColor: colors.color.lightGrey,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    paddingHorizontal: 20,
  },
  titleSearchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    width: "100%",
  },
});

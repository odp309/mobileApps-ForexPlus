import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyMediumTextSemiBold,
  HeadingSixText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import BranchItem from "../../../components/valasHome/valasTarik/BranchItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChooseBranchScreen = () => {
  const route = useRoute();
  const [inputBranch, setInputBranch] = useState("");
  const navigation = useNavigation();
  const { transactionData, location, getBranch } = route.params;

  const receiveBranchData = (branch) => {
    navigation.navigate("ChooseDate", {
      transactionData,
      selectedBranch: branch,
    });
  };

  const renderedView = ({ item }) => (
    <BranchItem data={item} handleOnPress={receiveBranchData} />
  );
  const filteredBranch = useMemo(() => {
    return getBranch.filter((item) =>
      item.name.toLowerCase().includes(inputBranch.toLowerCase())
    );
  }, [inputBranch, getBranch]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Tarik Valas" />
      </View>

      <View style={styles.middleContainer}>
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
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <FontAwesome name="search" size={24} color={colors.color.grey} />
            </View>
            <TextInput
              placeholder="Cari cabang..."
              value={inputBranch}
              onChangeText={setInputBranch}
              style={{
                fontFamily: "poppins-semibold",
                paddingTop: 5,
                width: "75%",
                color: colors.color.grey,
              }}
            />
          </View>
        </View>

        <View>
          {filteredBranch.length > 0 ? (
            <FlatList
              data={filteredBranch}
              key={(item) => {
                item.code;
              }}
              renderItem={renderedView}
            />
          ) : (
            <BodyMediumTextSemiBold style={{ textAlign: "center" }}>
              DATA KOSONG
            </BodyMediumTextSemiBold>
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
    marginTop: "10%",
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
    backgroundColor: colors.color.veryLightGrey,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "poppins-semibold",
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

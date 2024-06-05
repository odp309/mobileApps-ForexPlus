import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeText,
  BodyMediumText,
  BodyRegularText,
  BodySmallText,
  HeadingSixText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import PullConfirmationModal from "../../../components/valasHome/valasTarik/PullConfirmationModal";

const branchDummy = [
  {
    id: "1",
    branchName: "ASEMKA",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "2",
    branchName: "KCP CENTRAL PARK",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "3",
    branchName: "CITRA GARDEN 2",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "4",
    branchName: "CITY RESORT",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "5",
    branchName: "DAAN MOGOT BARU",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "6",
    branchName: "DAAN MOGOT D/H TOMANG PLAZA LONG TEXT",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "7",
    branchName: "MANGGA BESAR",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "8",
    branchName: "BLOK M",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
  {
    id: "9",
    branchName: "1234567890123456789012345",
    alamat: "DKI Jakarta, Jakarta Barat",
  },
];

const ChooseBranchScreen = () => {
  const [inputBranch, setInputBranch] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(branchDummy[0]);

  const toggleBottomSheet = () => {
    console.log("testing");
    setModalVisibility(!modalVisibility);
  };

  // Branch Item for Flatlist
  const BranchItem = (data) => {
    // Function to return the branch name to branchName...
    const longText = (text) => {
      const newText = text.slice(0, 24);
      const textWithDot = newText + "...";
      return textWithDot;
    };
    // Function when press on of the item
    const onPressItem = () => {
      setModalVisibility(!modalVisibility);
      setSelectedBranch(data);
    };

    return (
      <TouchableOpacity style={styles.branchItem} onPress={onPressItem}>
        <View style={{ marginHorizontal: 15 }}>
          <FontAwesome
            name="bank"
            size={40}
            color={colors.secondary.secondaryOne}
          />
        </View>
        <View>
          {/* If the text is too long, then replace the 25 index to the last as ... */}
          {data.branchName.length <= 24 ? (
            <BodyMediumText style={{ fontWeight: "bold" }}>
              {data.branchName}
            </BodyMediumText>
          ) : (
            <BodyMediumText style={{ fontWeight: "bold" }}>
              {longText(data.branchName)}
            </BodyMediumText>
          )}

          <BodySmallText
            style={{ fontWeight: "bold", color: colors.color.grey }}
          >
            {data.alamat}
          </BodySmallText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Tarik Valas" />
      </View>
      <View style={styles.middleContainer}>
        {/* Title and SearchBar */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 20,
            width: "100%",
          }}
        >
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
          <FlatList
            data={branchDummy}
            key={(item) => {
              item.id;
            }}
            renderItem={({ item }) => BranchItem(item)}
          />
        </View>
        
        <PullConfirmationModal
          modalVisibility={modalVisibility}
          toggleBottomSheet={toggleBottomSheet}
          branchData={selectedBranch}
        />
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
    flex: 0.15,
    paddingHorizontal: 20,
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
  branchItem: {
    marginHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary.primaryThree,
    flexDirection: "row",
  },
});

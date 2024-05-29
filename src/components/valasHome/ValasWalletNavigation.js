import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import colors from "../../theme/colors";
import { BodyLargeText, HeadingSixText } from "../shared/StyledText";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const NavButton = ({ item, onChangeWallet }) => {
  const sendToWalletNavitation = () => {
    onChangeWallet({
      id: item.id,
      valas: item.valas,
      totalValue: item.totalValue,
      isChosen: !item.isChosen,
    });
  };
  return (
    <TouchableOpacity
      style={{ justifyContent: "flex-start", alignItems: "center" }}
      onPress={sendToWalletNavitation}
    >
      {item.isChosen ? (
        <View style={{ marginRight: 17, alignItems: "center" }}>
          <BodyLargeText
            style={{ color: colors.primary.primaryOne, fontWeight: "bold" }}
          >
            {item.valas}
          </BodyLargeText>
          <Entypo
            name="dot-single"
            size={24}
            color={colors.primary.primaryOne}
            style={{ top: -8, height: 16 }}
          />
        </View>
      ) : (
        <View style={{ marginRight: 17, alignItems: "center" }}>
          <BodyLargeText style={{ color: colors.color.grey }}>
            {item.valas}
          </BodyLargeText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const ValasWalletNavigation = ({walletsData, onNavChange}) => {

  const handleNavData = (data) => {
    onNavChange(data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={walletsData}
        renderItem={({ item }) => (
          <NavButton
            item={item}
            walletsData={walletsData}
            onChangeWallet={handleNavData}
          />
        )}
        horizontal={true}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity>
        <AntDesign
          name="pluscircleo"
          size={25}
          color={colors.primary.primaryOne}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ValasWalletNavigation;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderColor: colors.primary.primaryThree,
  },
});

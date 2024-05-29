import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { BodyMediumText, BodyRegularText } from "../shared/StyledText";
import colors from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const RekeningItem = ({ item, isListShown }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <View>
        <BodyMediumText>{item.nomorRek}</BodyMediumText>
        <BodyRegularText>{item.tipeRek}</BodyRegularText>
      </View>
      <View>
        {isListShown ? (
          <Fontisto
            name="radio-btn-active"
            size={24}
            color={colors.primary.primaryOne}
          />
        ) : (
          <AntDesign name="down" size={24} color="black" />
        )}
      </View>
    </View>
  );
};

const DaftarRekening = () => {
  const [isListShown, setIsListShown] = useState(false);
  const [listRekening, setListRekening] = useState([
    {
      id: "1",
      nomorRek: "18901517618",
      tipeRek: "Taplus Pegawai BNI",
    },
    {
      id: "2",
      nomorRek: "189019084718",
      tipeRek: "Taplus Muda",
    },
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={{ paddingTop: 20 }}>
      {/* <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        {listRekening.map((item, index) => (
          <Picker.Item
            key={item.id}
            label={item.nomorRek}
            value={item.nomorRek}
          />
        ))}
      </Picker> */}
      <RekeningItem item={listRekening[0]} />
        {/*numberOfLines={2} itemStyle={{color:colors.primary.primaryOne}}  <Picker.Item key={index} label={<CustomLabel style={item.customStyle}>{item.label}</CustomLabel>} value={item.value} /> */}

      {/* <RekeningItem item={isListShown[0]} isListShown={isListShown} /> */}
      {/* <FlatList
        data={listRekening}
        renderItem={({ item }) => (
          <RekeningItem item={item} isListShown={isListShown} />
        )}
        keyExtractor={(item) => item.id}
      /> */}
      {/* {isListShown ? (
        <FlatList
          data={listRekening}
          renderItem={({ item }) => ( 
            <RekeningItem item={item} isListShown={isListShown} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <RekeningItem item={isListShown[0]} isListShown={isListShown} />
      )} */}
    </View>
  );
};

export default DaftarRekening;

const styles = StyleSheet.create({
  container: {},
});

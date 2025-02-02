import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BodyRegularText } from "../../components/shared/StyledText";
import Header from "../../components/home/Header";
import HeaderProfile from "../../components/home/HeaderProfile";
import Pocket from "../../components/home/Pocket";
import Feature from "../../components/home/Feature";
import PromoInformasi from "../../components/home/PromoInformasi";
import { handleLogout, userData } from "../../config/AuthConfig";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const renderedView = ({ item }) => <View>{item.view()}</View>;
const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const isFocused = useIsFocused();
  const backAction = () => {
    handleLogout(navigation);
    return true;
  };
  useEffect(() => {
    if (user === null) {
      setTimeout(() => {
        setUser(userData);
        if (userData !== null) {
          setFullName(`${userData.firstName} ${userData.lastName}`);
        }
      }, 500);
    }
  }, []);
  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);

  const data = (user, fullName) => [
    { id: "1", view: () => <Header user={user} /> },
    { id: "2", view: () => <HeaderProfile user={user} fullName={fullName} /> },
    { id: "3", view: () => <Pocket user={user} /> },
    { id: "4", view: () => <Feature user={user} /> },
    {
      id: "5",
      view: () => (
        <View>
          <View
            style={{ width: "100%", height: 6, backgroundColor: "#FDE7DF" }}
          />
          <PromoInformasi user={user} />
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data(user, fullName)}
        renderItem={renderedView}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "7%",
  },
});

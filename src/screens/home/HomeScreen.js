import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BodyRegularText } from "../../components/shared/StyledText";
import Header from "../../components/home/Header";
import HeaderProfile from "../../components/home/HeaderProfile";
import Pocket from "../../components/home/Pocket";
import Feature from "../../components/home/Feature";
import PromoInformasi from "../../components/home/PromoInformasi";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { fetchBankAccount } from "../../config/ValasConfig";
import { StatusBar } from "expo-status-bar";
import LogoutConfirmationModal from "../../components/home/LogoutConfirmationModal";
import { ModalContext } from "../../context/ModalContext";
import colors from "../../theme/colors";
import { userData } from "../../config/AuthConfig";

const renderedView = ({ item }) => <View>{item.view()}</View>;

const HomeScreen = () => { 
  const navigation = useNavigation();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [accountNumbers, setAccountNumbers] = useState("");
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const backAction = () => {
    setShowModal(true);
    return true;
  };

  const getAllAccounts = async () => {
    try {
      const allAccountNumbers = await fetchBankAccount(userData.id);
      setAccountNumbers(allAccountNumbers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userData) {
        setTimeout(() => {
          setUser(userData);
          setFullName(`${userData.firstName} ${userData.lastName}`);
          getAllAccounts();
        }, 500);
      }
    }, [userData])
  );

  useEffect(() => {
    console.log("userdata : ", userData);
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
    {
      id: "3",
      view: () => <Pocket user={user} accountNumbers={accountNumbers} />,
    },
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
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        style="dark"
        translucent={true}
        backgroundColor="transparent"
      />
      <LogoutConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
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

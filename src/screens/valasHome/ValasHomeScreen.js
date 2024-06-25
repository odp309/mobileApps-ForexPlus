import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback, useId } from "react";
import colors from "../../theme/colors";
import ValasHeader from "../../components/valasHome/ValasHeader";
import { BodyMediumTextSemiBold } from "../../components/shared/StyledText";
import ValasFeatures from "../../components/valasHome/ValasFeatures";
import ValasReservation from "../../components/valasHome/ValasReservation";
import WalletCard from "../../components/valasHome/WalletCard";
import NavigasiRekeningWallet from "../../components/valasHome/NavigasiRekeningWallet";
import CurrencyInformation from "../../components/valasHome/CurrencyInformation";
import {
  fetchBankAccount,
  fetchCurrentBuyLimit,
  fetchIsCooldown,
  fetchKurs,
  fetchLimitBuy,
  fetchReservationList,
} from "../../config/ValasConfig";
import ValasCreateContent from "../../components/valasHome/ValasCreateContent";
import AddWalletButton from "../../components/valasHome/AddWalletButton";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { userData } from "../../config/AuthConfig";
import CoolDownModal from "../../components/valasHome/shared/CoolDownModal";
import PurchaseLimitModal from "../../components/valasHome/shared/PurchaseLimitModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReservationDetectedModal from "../../components/valasHome/shared/ReservationDetectedModal";
import { currentBuyValasIDR } from "../../config/SharedConfig";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const ValasHomeScreen = () => {
  const [modalVisibleTarik, setModalVisibleTarik] = useState(false);
  const [modalVisibleBeli, setModalVisibleBeli] = useState(false);
  const [modalVisibleReservation, setModalVisibleReservation] = useState(false);
  const [selectedRekening, setSelectedRekening] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [reservation, setReservation] = useState([]);
  const [listRekening, setListRekening] = useState(null);
  const [dataCurrency, setDataCurrency] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBuy, setCurrentBuy] = useState(0);
  const [convertedCurrentBuy, setConvertedCurrentBuy] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState("");
  const userId = userData.id;

  const getData = async () => {
    try {
      const data = await fetchBankAccount(userId);
      setListRekening(data);
      let currentSelectedRekening = null;

      const savedRekeningId = await AsyncStorage.getItem(
        `selectedRekening_${userId}`
      );
      if (savedRekeningId !== null) {
        currentSelectedRekening = data.find(
          (rekening) => rekening.id === parseInt(savedRekeningId)
        );
      } else {
        currentSelectedRekening = data[data.length - 1];
      }

      setSelectedRekening(currentSelectedRekening);

      if (
        currentSelectedRekening &&
        currentSelectedRekening.listWallet.length > 0
      ) {
        const savedWalletId = await AsyncStorage.getItem(
          `selectedWallet_${userId}`
        );
        const currentSelectedWallet =
          savedWalletId !== null
            ? currentSelectedRekening.listWallet.find(
                (wallet) => wallet.id === parseInt(savedWalletId)
              )
            : currentSelectedRekening.listWallet[0];
        setSelectedWallet(currentSelectedWallet);
      }
    } catch (error) {
      console.error("Error di home: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentBuyLimit = async () => {
    try {
      const data = await fetchCurrentBuyLimit(userId);
      setCurrentBuy(data.currLimit);
      console.log("Limit buy : ", data);
    } catch (error) {
      console.log("Error limit buy : ", error);
    }
  };
  const getReservation = async () => {
    try {
      const response = await fetchReservationList();
      setReservation(response);

      console.log("Hasil response : ", reservation);
    } catch (error) {
      console.log("data null");
    }
  };
  const getDataKurs = async () => {
    try {
      const data = await fetchKurs();
      setDataCurrency(data); 
    } catch (error) {
      console.error(error);
    }
  };

  const getConvertedLimit = () => {
    if (currentBuy && dataCurrency && selectedCurrency) {
      const convertedBuy = currentBuyValasIDR(currentBuy, dataCurrency,selectedCurrency);
      setConvertedCurrentBuy(convertedBuy);
    }
  };

  const saveSelectedRekening = async (rekening) => {
    try {
      await AsyncStorage.setItem(
        `selectedRekening_${userId}`,
        rekening.id.toString()
      );
    } catch (error) {
      console.error("Error saving selected rekening: " + error);
    }
  };

  const saveSelectedWallet = async (wallet) => {
    try {
      await AsyncStorage.setItem(
        `selectedWallet_${userId}`,
        wallet.id.toString()
      );
    } catch (error) {
      console.error("Error saving selected wallet: " + error);
    }
  };
  const getIsCoolDown = async () => {
   const data = await fetchIsCooldown();
   console.log("Fetch is cooldown : ",data);
   if(data==="Withdrawal can only be one at a time"){
      setWithdrawStatus("On Process");
   }
   else if(data==="User in cooldown"){
      setWithdrawStatus("Cooldown");
   }
   else {
      setWithdrawStatus("OK");
   } 
   return data;
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem(`selectedRekening_${userId}`);
      await AsyncStorage.removeItem(`selectedWallet_${userId}`);
    } catch (error) {
      console.error("Error clearing AsyncStorage: " + error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getData();
      getDataKurs();
      getReservation();
      getCurrentBuyLimit(); 
      getIsCoolDown();
      console.log("Reservation : ", reservation);
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Call the functions to fetch new data
      await getData();
      await getDataKurs();
      await getReservation();
      await getCurrentBuyLimit();
    } catch (error) {
      console.error('Error refreshing data: ', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (selectedRekening != null) {
      saveSelectedRekening(selectedRekening);
      setSelectedWallet(selectedRekening.listWallet[0]);
    }
  }, [selectedRekening]);

  useEffect(() => {
    if (selectedWallet != null) {
      saveSelectedWallet(selectedWallet);
    }
  }, [selectedWallet]);

  useEffect(() => {
    if (currentBuy !== 0 && dataCurrency !== null && selectedCurrency !==null) {
      getConvertedLimit();
    }
  }, [currentBuy, dataCurrency,selectedCurrency]);
  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }

  const data = [
    {
      id: "1",
      view: () => (
        <View>
          <NavigasiRekeningWallet
            selectedRekening={selectedRekening}
            setSelectedRekening={(rekening) => {
              setSelectedRekening(rekening);
              saveSelectedRekening(rekening);
            }}
            selectedWallet={selectedWallet}
            setSelectedWallet={(wallet) => {
              setSelectedWallet(wallet);
              saveSelectedWallet(wallet);
            }}
            listRekening={listRekening}
          />
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: colors.primary.primaryThree,
              marginBottom: 20,
            }}
          />
        </View>
      ),
    },
    {
      id: "2",
      view: () =>
        selectedWallet != null ? (
          <WalletCard
            valasType={selectedWallet.currencyCode}
            selectedWallet={selectedWallet}
            setSelectedWallet={(wallet) => {
              setSelectedWallet(wallet);
              saveSelectedWallet(wallet);
            }}
          />
        ) : (
          <ValasCreateContent selectedRekening={selectedRekening} />
        ),
    },
    {
      id: "3",
      view: () =>
        selectedWallet && (
          <ValasFeatures
            dataCurrency={dataCurrency}
            selectedRekening={selectedRekening}
            selectedWallet={selectedWallet}
            selectedCurrency={selectedCurrency}
            modalVisibleTarik={modalVisibleTarik}
            setModalVisibleTarik={setModalVisibleTarik}
            setModalVisibleReservation={setModalVisibleReservation}
            modalVisibleReservation={modalVisibleReservation}
            modalVisibleBeli={modalVisibleBeli}
            setModalVisibleBeli={setModalVisibleBeli}
            convertedCurrentBuy={convertedCurrentBuy}
            reservation={reservation}
            withdrawStatus={withdrawStatus}
          />
        ),
    },
    {
      id: "4",
      view: () =>
        reservation.length > 0 && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingTop: 20,
              marginTop: 10,
              borderTopWidth: 4,
              borderTopColor: colors.primary.primaryThree,
            }}
          >
            <BodyMediumTextSemiBold
              style={{ color: colors.color.grey, marginBottom: 10 }}
            >
              Reservasi Anda
            </BodyMediumTextSemiBold>
            <ValasReservation reservation={reservation[0]} />
          </View>
        ),
    },
    {
      id: "5",
      view: () => (
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingTop: 20,
            marginTop: 10,
            borderTopWidth: 4,
            borderTopColor: colors.primary.primaryThree,
          }}
        >
          <BodyMediumTextSemiBold
            style={{ color: colors.color.grey, marginBottom: 10 }}
          >
            Info Kurs Mata Uang
          </BodyMediumTextSemiBold>
          <CurrencyInformation
            dataCurrency={dataCurrency}
            setDataCurrency={setDataCurrency}
            selectedWallet={selectedWallet}
            setSelectedCurrency={setSelectedCurrency}
            selectedCurrency={selectedCurrency}
          />
        </View>
      ),
    },
  ];

  const renderedView = ({ item }) => <View>{item.view()}</View>;

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        translucent={true}
        backgroundColor="transparent"
      />
      {selectedWallet && (
        <CoolDownModal
          modalVisible={modalVisibleTarik}
          setModalVisible={setModalVisibleTarik}
        />
      )}
      {selectedWallet && (
        <PurchaseLimitModal
          modalVisible={modalVisibleBeli}
          setModalVisible={setModalVisibleBeli}
          limit={50000}
          currencyCode={selectedWallet.currencyCode}
        />
      )}

      {reservation.length > 0 && (
        <ReservationDetectedModal
          modalVisible={modalVisibleReservation}
          setModalVisible={setModalVisibleReservation}
        />
      )}

      <ValasHeader />
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderedView}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary.primaryOne]}
            />
          }
        />
      </View>
      {selectedWallet && (
        <View style={styles.addWallet}>
          <AddWalletButton selectedRekening={selectedRekening} />
        </View>
      )}
    </View>
  );
};

export default ValasHomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: colors.color.white,
    flex: 1,
  },
  content: {
    top: 0.22 * WINDOW_HEIGHT,
    flex: 0.78,
  },
  addWallet: {
    zIndex: 10,
    position: "absolute",
    bottom: 50,
    right: 26,
  },
});

import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import colors from "../../theme/colors";
import ValasHeader from "../../components/valasHome/ValasHeader";
import {
  BodyMediumTextSemiBold,
  BodySmallTextSemiBold,
} from "../../components/shared/StyledText";
import ValasFeatures from "../../components/valasHome/ValasFeatures";
import ValasReservation from "../../components/valasHome/ValasReservation";
import WalletCard from "../../components/valasHome/WalletCard";
import NavigasiRekeningWallet from "../../components/valasHome/NavigasiRekeningWallet";
import CurrencyInformation from "../../components/valasHome/CurrencyInformation";
import { fetchBankAccount, fetchNomorRekening } from "../../config/ValasConfig";
import { userData } from "../../config/AuthConfig";
import ValasCreateContent from "../../components/valasHome/ValasCreateContent";
import AddWalletButton from "../../components/valasHome/AddWalletButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const ValasHomeScreen = () => {
  const navigation = useNavigation();
  const [selectedRekening, setSelectedRekening] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [listRekening, setListRekening] = useState(null);
  const [dataCurrency, setDataCurrency] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetchBankAccount(userData.id);
      setListRekening(data);
      let currentSelectedRekening = null;

      if(selectedRekening === null){
        // console.log("Selected Rekening null")
         currentSelectedRekening= data[data.length-1];
      }
      else{
        // console.log("Selected Rekening ada" + selectedRekening.id-1)
        currentSelectedRekening = data[selectedRekening.id];
      }
      
      setSelectedRekening(currentSelectedRekening);

      if (
        currentSelectedRekening &&
        currentSelectedRekening.listWallet.length > 0
      ) {
        setSelectedWallet(currentSelectedRekening.listWallet[0]);
      }
    } catch (error) {
      console.error("Error di home: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    if (selectedRekening != null) {
      // console.log("Ganti Wallet");
      setSelectedWallet(selectedRekening.listWallet[0]);
    }
  }, [selectedRekening]);

  useEffect(() => {
    console.log("wallet: " + selectedWallet);
  }, [selectedWallet]);

 
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
            setSelectedRekening={setSelectedRekening}
            selectedWallet={selectedWallet}
            setSelectedWallet={setSelectedWallet}
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
            setSelectedWallet={setSelectedWallet}
          />
        ) : (
          <ValasCreateContent selectedRekening={selectedRekening} />
        ),
    },
    {
      id: "3",
      view: () =>
        selectedWallet != null && (
          <ValasFeatures
            selectedRekening={selectedRekening}
            selectedWallet={selectedWallet}
            selectedCurrency={selectedCurrency}
          />
        ),
    },
    {
      id: "4",
      view: () =>
        selectedWallet != null && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingTop: 10,
              marginTop: 10,
              borderTopWidth: 4,
              borderTopColor: colors.primary.primaryThree,
            }}
          >
            <BodyMediumTextSemiBold
              style={{ color: colors.color.grey, marginBottom: 10 }}
            >
              Daftar Reservasi Tarik
            </BodyMediumTextSemiBold>
            <ValasReservation />
            <TouchableOpacity onPress={()=> navigation.navigate("ValasReservation")}>
              <BodySmallTextSemiBold style={{textAlign:'center',color:colors.color.grey}}>Lihat selengkapnya</BodySmallTextSemiBold>
            </TouchableOpacity>
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
            paddingTop: 10,
            marginTop: 10,
            borderTopWidth: 4,
            borderTopColor: colors.primary.primaryThree,
          }}
        >
          <BodyMediumTextSemiBold
            style={{ color: colors.color.grey, marginBottom: 10 }}
          >
            Daftar Kurs Mata Uang
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
      <StatusBar style="light" translucent={true} backgroundColor="transparent" />
      <ValasHeader /> 
        <View style={styles.content}>
          <FlatList
            data={data}
            renderItem={renderedView}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
  addWallet:{
    zIndex:10,
    position:'absolute',
    bottom:50,
    right:26
  }
});
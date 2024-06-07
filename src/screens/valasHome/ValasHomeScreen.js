import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../theme/colors";
import ValasHeader from "../../components/valasHome/ValasHeader";
import {
  BodyMediumText,
  BodySmallText,
} from "../../components/shared/StyledText";
import ValasFeatures from "../../components/valasHome/ModalValasFeatures";
import ValasReservation from "../../components/valasHome/ValasReservation";
import WalletCard from "../../components/valasHome/WalletCard";
import NavigasiRekeningWallet from "../../components/valasHome/NavigasiRekeningWallet";
import CurrencyInformation from "../../components/valasHome/CurrencyInformation";
import { fetchBankAccount, fetchNomorRekening } from "../../config/ValasConfig";
import { userData } from "../../config/AuthConfig";

const WINDOW_HEIGHT = Dimensions.get("screen").height;

const ValasHomeScreen = () => {
  const [selectedRekening, setSelectedRekening] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [listRekening, setListRekening] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetchBankAccount(userData.id);
      setListRekening(data);

      const currentSelectedRekening = data[0];
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedRekening != null) {
      console.log("Ganti Wallet");
      setSelectedWallet(selectedRekening.listWallet[0]);
    }
  }, [selectedRekening]);

  if (isLoading) {
    return (
      <View style={{ justifyContent: "flex-start", flex: 1 }}>
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
      view: () => (
        <WalletCard
          valasType={selectedWallet.currencyCode}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
      ),
    },
    { id: "3", view: () => <ValasFeatures /> },
    {
      id: "4",
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
          <BodyMediumText style={{ color: colors.color.grey }}>
            Daftar Reservasi Tarik
          </BodyMediumText>
          <ValasReservation />
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
          <BodyMediumText style={{ color: colors.color.grey }}>
            Daftar Kurs Mata Uang
          </BodyMediumText>
          <CurrencyInformation />
        </View>
      ),
    },
  ];

  const renderedView = ({ item }) => <View>{item.view()}</View>;

  return (
    <View style={styles.container}>
      <ValasHeader />
      {selectedRekening && selectedWallet && (
        <View style={styles.content}>
          <FlatList
            data={data}
            renderItem={renderedView}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
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
    height: 0.78 * WINDOW_HEIGHT,
  },
});

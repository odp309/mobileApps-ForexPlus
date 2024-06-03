import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { HeadingSixText } from "../components/shared/StyledText";
import StyledButton from "../components/shared/StyledButton";
import colors from "../theme/colors";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function BeliValas() {
  const navigation = useNavigation();

  const [nominalPembelian, setNominalPembelian] = useState("");
  const [nominalAsal, setNominalAsal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleNominalPembelianChange = (text) => {
    setNominalPembelian(text);
  };

  const handleNominalAsalChange = (text) => {
    setNominalAsal(text);
  };
  
  return (
    
    <View style={styles.container}>  
    <Modal visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(true)}>
        
        <View style={{ 
          flex: 1, 
          height: Dimensions.get("window").height * 0.5,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:'rgba(0,0,0,0.2)'}}>
        <View></View>
        <View style={styles.modalContent}>
        <View style={{width: '100%', marginBottom: '20%', alignItems: 'flex-end', position: 'relative'}}>
          <TouchableOpacity onPress={setModalVisible}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <HeadingSixText style={styles.confirmationText}>Konfirmasi Pembelian Valas</HeadingSixText>
        <View style={styles.modalBody}>
              <Image
                source={require("../../assets/icons/flags/Australia-flag.png")}
                style={styles.flagModal}
              />
              <Text style={styles.currencyModal}>Dolar Australia</Text>
              <Text style={styles.currencyCode}>AUD</Text>
            </View>
            <View style={styles.modalDetails}>
            <View style={styles.row}>
                <Text style={styles.label}>Nominal Pembelian</Text>
                <Text style={styles.value}>AUD 11</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Kurs Beli</Text>
                <Text style={styles.value}>AUD 1 = IDR 10.973 </Text>
                </View>
            <View style={styles.row}>
                <Text style={styles.label}>Total Transaksi</Text>
                <Text style={styles.value}>IDR 131.703</Text>
            </View>
            <View style={styles.orangeLine} />
            <View style={styles.rekeningSumberContainer}>
              <Text style={styles.rekeningSumberLabel}>Rekening Sumber</Text>
              <View style={styles.rekeningSumberDetails}>
                <View style={styles.rekeningSumberTextContainer}>
                  <Text style={styles.rekeningSumberText}>TAPLUS PEGAWAI BNI</Text>
                  <Text style={styles.rekeningSumberNumber}>18901517618</Text>
                  <Text style={styles.rekeningSumberSaldo}>Rp 10.000.000</Text>
                </View>
                <View style={styles.rekeningSumberImage}>
                  <Image
                    source={require("../../assets/46.png")}
                    resizeMode="stretch"
                    style={styles.bniImage}
                  />
                </View>
              </View>
            </View>
        <View style={{ width: "100%" }}>
              <StyledButton
                mode={"primary"}
                title={"Beli"} 
                size={"lg"}
                
                style={{ flex: 0, marginVertical: 10, marginHorizontal: 10, 
                borderRadius: 40,
                paddingVertical: 20,
                paddingHorizontal: 170,
                alignItems: 'center',
                 }}
              />
            </View>
          </View>
        </View>
        </View>
    </Modal>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={require("../../assets/arrow-back-grey.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>Pembelian Valas</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nominal Pembelian</Text>
        <View style={styles.inputField}>
          <Image
            source={require("../../assets/icons/flags/Australia-flag.png")}
            style={styles.flag}
          />
          <Text style={styles.currency}>AUD</Text>
          <View style={styles.separator} />
          <TextInput    
            style={styles.textInput}
            placeholder="Masukkan Nominal"
            placeholderTextColor={"#FDC6AB"}
            onChangeText={handleNominalPembelianChange}
            value={nominalPembelian}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.arrowDownContainer}>
        <Image source={require("../../assets/arrow_down_orange.png")} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nominal Asal</Text>
        <View style={styles.inputFieldAsal}>
          <Image
            source={require("../../assets/icons/flags/Indonesia-flag.png")}
            style={styles.flag}
          />
          <Text style={styles.currency}>IDR</Text>
          <View style={styles.separatorNominalAsal} />
          <TextInput
            style={styles.textInput}
            onChangeText={handleNominalAsalChange}
            value={nominalAsal}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.kursBeliContainer}>
        <Text style={styles.kursBeliText}>Kurs Beli</Text>
        <Text style={styles.kursBeliValue}>AUD 1 = IDR 11.973</Text>
      </View>
      <View style={styles.boxRekeningSumber}>
        <View style={styles.rekeningSumberContainer}>
          <Text style={styles.rekeningSumberText}>Rekening Sumber</Text>

          <View style={styles.rekeningSumberDetails}>
            <View style={{ width: "65%", paddingLeft: 15, paddingTop: 7 }}>
              <Text style={styles.rekeningSumberName}>TAPLUS PEGAWAI BNI</Text>
              <Text style={styles.rekeningSumberNumber}>18901517618</Text>
              <Text style={styles.rekeningSumberSaldo}>Rp 10.000.000</Text>
            </View>
            <View style={styles.rekeningSumberImage}>
              <Image
                source={require("../../assets/46.png")}
                resizeMode="stretch"
                style={styles.bniImage}
              />
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {(setModalVisible(true))}}>
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  modalContent: {
    width: "100%",
    height: "60%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
    confirmationText: {
      color: colors.primary.primaryOne,
      fontWeight: "bold",
      fontSize: 21,
      marginBottom: 30,
      marginTop: -80
  },
  backButton: {
    marginBottom: 30,
    paddingTop: 25,
    marginHorizontal: "5%"
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -20,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#535353",
    marginBottom: 5,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EF5C26",
    backgroundColor: '#FDE7DF',
    borderRadius: 28,
    padding: 10,
    marginBottom: 0,
    marginLeft: -2,
    marginRight: -2,
  },
  inputFieldAsal: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#E3E3E3",
    borderColor: "#E3E3E3",
    borderRadius: 28,
    padding: 10,
    marginBottom: 10,
    marginLeft: -2,
    marginRight: -2,
  },
  separator: {
    width: 2,
    height: "170%",
    backgroundColor: '#EF5C26',
    marginHorizontal: 8,
  },
  separatorNominalAsal: {
    width: 2,
    height: "175%",
    backgroundColor: '#535353',
    marginHorizontal: 14,
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 10, 
  },
  flagModal: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: -110,
  },
  currencyModal:{
    fontSize: 16,
    fontWeight: "bold",
    right: 35,
    bottom: 10,
  },
  currencyCode:{
    fontSize: 16,
    top: 10,
    right: 141,
  },
  modalBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  modalDetails:{
    flex: 1,
    top: 25,
  },  
  //modalDetailText: {
  //  flexDirection: 'row',
  //  justifyContent: 'space-between',
  //  fontSize: 13,
  //  right: 70,
  //  marginBottom: 10,
  //},
  //modalDetailValue: {
  //  fontSize: 16,
  //  fontWeight: 'bold',
  //},
  orangeLine: {
    left: -3 ,
    bottom: 5,
    width: 418, // Atur sesuai kebutuhan
    height: 3, // Tinggi garis
    backgroundColor: '#FDE7DF', // Warna oranye
    marginVertical: 10, // Margin vertikal jika diperlukan
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 30
  },
  label: {
    fontSize: 13,
    color: '#000',
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    paddingRight: 30
  },
  currency: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'black',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    paddingLeft: 20,
  },
  arrowDownContainer: {
    alignItems: "center",
    
    marginTop: 8,
    marginBottom: 0,
  },
  kursBeliContainer: {
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  kursBeliText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#535353",
  },
  kursBeliValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EF5C26",
  },
  boxRekeningSumber: {
    backgroundColor: "#F0EBEB",
  },
  rekeningSumberContainer: {
    marginTop: -2,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  rekeningSumberLabel:{
    bottom: 8,
  },
  rekeningSumberText: {
    top: 2,
    left: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#535353",
  },
  rekeningSumberDetails: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rekeningSumberName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rekeningSumberNumber: {
    top: -5,
    left: 10,
    fontSize: 18,
    marginBottom: 5,
    color: "#000000",
  },
  rekeningSumberSaldo: {
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  rekeningSumberImage: {
    width: "35%",
    // borderWidth:1
  },
  bniImage: {
    width: "100%",
    left: 75,
    borderColor: "red",
    height: 100,
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 28,
    marginTop: 120,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

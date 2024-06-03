import {
    BodyLargeTextSemiBold,
    BodyMediumText,
    BodyMediumTextSemiBold,
    BodySmallText,
    BodySmallTextSemiBold,
    HeadingSixText,
  } from "../../../components/shared/StyledText";
  import StyledButton from "../../../components/shared/StyledButton";
  import colors from "../../../theme/colors";
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
  import { Ionicons } from "@expo/vector-icons";
  import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
  import { FontAwesome } from "@expo/vector-icons";
  import WalletSource from "../../../components/valasHome/shared/WalletSource";
  import ExchangeResult from "../../../components/valasHome/shared/ExchangeResult";
  import InputCurrency from "../../../components/valasHome/shared/InputCurrency";
const ModalVerification = ({modalVisible,setModalVisible,handlePinVerification}) => {
    return (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(true)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  alignItems: "flex-end",
                  marginRight:10
                }}
              >
                <TouchableOpacity onPress={setModalVisible}>
                  <Ionicons name="close" size={28} color={"black"} />
                </TouchableOpacity>
              </View>
              <HeadingSixText style={styles.confirmationText}>
                Konfirmasi Pembelian Valas
              </HeadingSixText>
              <View style={styles.modalCurrency}>
                <Image
                  source={require("../../../../assets/icons/flags/Australia.png")}
                  style={styles.flagModal}
                />
                <View style={{ marginLeft: 15, justifyContent: "center" }}>
                  <BodyMediumTextSemiBold>Dolar Australia</BodyMediumTextSemiBold>
                  <BodyMediumText style={styles.currencyCode}>AUD</BodyMediumText>
                </View>
              </View>
              <View style={styles.modalDetails}>
                <View style={styles.row}>
                  <BodySmallText>Nominal Pembelian</BodySmallText>
                  <BodySmallTextSemiBold>AUD 11</BodySmallTextSemiBold>
                </View>
                <View style={styles.row}>
                  <BodySmallText style={styles.label}>Kurs Beli</BodySmallText>
                  <BodySmallTextSemiBold>
                    AUD 1 = IDR 10.973{" "}
                  </BodySmallTextSemiBold>
                </View>
                <View style={styles.row}>
                  <BodySmallText style={styles.label}>
                    Total Transaksi
                  </BodySmallText>
                  <BodySmallTextSemiBold>IDR 131.703</BodySmallTextSemiBold>
                </View>
                <View style={styles.orangeLine} />
                <View style={styles.rekeningSumberContainer}>
                  <WalletSource
                    judul={"TAPLUS PEGAWAI BNI"}
                    isi={"18901517618"}
                    saldo={"IDR 10.000.000"}
                    style={{backgroundColor:'white'}}
                  />
                </View>
                <View>
                  <StyledButton
                  onPress={handlePinVerification}
                    mode={"primary"}
                    title={"Beli"}
                    size={"lg"}
                    style={{ 
                      alignItems: "center",
                      marginHorizontal:20, 
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
}

export default ModalVerification

const styles = StyleSheet.create({
    modalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
      },
      modalContent: {
        backgroundColor: "white",
        justifyContent: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20, 
        paddingVertical:10
      },
      confirmationText: {
        color: colors.primary.primaryOne,
        fontWeight: "bold",
        fontSize: 21,
        marginBottom: 30,
        alignSelf: "center",
      },
      backButton: {
        marginBottom: 30,
        paddingTop: 25,
        marginHorizontal: "5%",
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
        color: "#535353",
      },
      inputField: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EF5C26",
        backgroundColor: "#FDE7DF",
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
        backgroundColor: "#EF5C26",
        marginHorizontal: 8,
      },
      separatorNominalAsal: {
        width: 2,
        height: "175%",
        backgroundColor: "#535353",
        marginHorizontal: 14,
      },
      flag: {
        width: 24,
        height: 24,
        marginRight: 10,
      },
      flagModal: {
        width: 60,
        height: 60,
      },
      currencyModal: {
        fontSize: 16,
        fontWeight: "bold",
      },
      currencyCode: {
        fontSize: 16,
      },
      modalCurrency: {
        flexDirection: "row",
        marginBottom: 30,
        paddingHorizontal:20
      },
      modalDetails: {
        marginTop: 10,
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
        width: "100%", // Atur sesuai kebutuhan
        height: 3, // Tinggi garis
        backgroundColor: "#FDE7DF", // Warna oranye 
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingHorizontal:20
      },
      label: {
        fontSize: 13,
        color: "#000",
      },
      value: {
        fontSize: 13,
        fontWeight: "bold",
      },

})
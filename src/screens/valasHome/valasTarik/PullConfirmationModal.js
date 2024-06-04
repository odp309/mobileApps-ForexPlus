import { BottomSheet } from "@rneui/themed";
import {
  BodyLargeText,
  BodyMediumText,
  BodyRegularText,
  BodySmallText,
  HeadingSixText,
} from "../../../components/shared/StyledText";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import StyledButton from "../../../components/shared/StyledButton";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const PullConfirmationModal = ({ modalVisibility, toggleBottomSheet,branchData }) => {
    const navigation = useNavigation();

    const toPinVerification = () => {
        toggleBottomSheet();
        navigation.navigate("PinConfirmation");
    }
    
  return (
    <BottomSheet isVisible={modalVisibility}>
      <View style={styles.modalContent}>
        <View style={styles.topContainer}>
          {/* CLOSE BUTTON */}
          <View
            style={{ width: "100%", alignItems: "flex-end", paddingRight: 20 }}
          >
            <TouchableOpacity onPress={toggleBottomSheet}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <HeadingSixText style={styles.confirmationTextTitle}>
            Konfirmasi Tarik Valas
          </HeadingSixText>
        </View>
        {/* Middle Container */}
        <View style={styles.middleContainer}>
          {/* Info Sumber */}
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../../../../assets/icons/flags/Japan.png")}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
            </View>
            <View>
              <BodyLargeText style={{ fontWeight: "bold" }}>
                Yen Jepang
              </BodyLargeText>
              <BodyMediumText>JPY</BodyMediumText>
            </View>
          </View>
          {/* Kantor Tujuan */}
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="bank"
                size={40}
                color={colors.secondary.secondaryOne}
              />
            </View>
            <View style={{width:'70%'}}>
              <BodyLargeText style={{ fontWeight: "bold" }}>
                {branchData.branchName}
              </BodyLargeText>
              <BodyMediumText>{branchData.alamat}</BodyMediumText>
            </View>
          </View>
          {/* Total Penarikan */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingBottom:20,
              borderColor:colors.primary.primaryThree,
              borderBottomWidth:5,
            }}
          >
            <BodyRegularText>Total Penarikan</BodyRegularText>
            <BodyRegularText>JPY 500000</BodyRegularText>
          </View>
          {/* Dompet SUMBER */}
          <WalletSource style={{backgroundColor:colors.color.white}}/>
        </View>
        {/* Bottom Container */}
        <View style={styles.bottomContainer}>
          <StyledButton mode="primary" title="Tarik" onPress={toPinVerification}/>
        </View>
      </View>
    </BottomSheet>
  );
};

export default PullConfirmationModal;

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  middleContainer: {
    width: "100%",    
  },

  bottomContainer: { 
    width: "100%",
    justifyContent: "center",
    paddingHorizontal:20
  },

  confirmationTextTitle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems:'center',
    marginBottom: 20,
  },
  iconContainer: {
    marginHorizontal: 20,
  },
});

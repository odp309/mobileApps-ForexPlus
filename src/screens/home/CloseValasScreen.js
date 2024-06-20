import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native'
import React from 'react';
import { useState } from 'react';
import Modal from 'react-native-modalbox';
import StyledButton, {} from "../../components/shared/StyledButton";
import { BodyMediumText, } from "../../components/shared/StyledText";
import colors from '../../theme/colors';


const CloseValasScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModalValas = () => {
    setModalVisible(true);
  };

  const closeModalValas = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Testing Modal Screen Log Out BNI Valas</Text>
      <View style={styles.buttonYes}>
        <StyledButton mode='primary' title='Close BNI Valas' onPress={openModalValas}
        />
      </View>

      <Modal
        isOpen={isModalVisible}
        onClosed={closeModalValas}
        style={styles.modalContainer}
        backdropPressToClose = {false}
        swipeToClose = {false}
      >
        <Image
          source={require("../../../assets/yes-no.png")}
          style={styles.icon}
        />
        <BodyMediumText style={styles.messageText}>
          Anda yakin ingin membatalkan transaksi?
        </BodyMediumText>
        <View style={styles.viewButton}>
          <View style={styles.buttonNo}>
           <StyledButton mode='primary-outlined' title='Tidak' onPress={closeModalValas}
            /> 
          </View>
          <View style={styles.buttonYes}>
           <StyledButton mode='primary' title='Ya' onPress={closeModalValas}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CloseValasScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '88%',
    height: '28%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop:-70
  },
  messageText: {
    width: '77%',
    textAlign: 'center',
    color: colors.primary.primaryOne,
    marginTop: 10,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonYes: {
    width:'35%',
    marginHorizontal: 10,
  },
  buttonNo: {
    width: '35%',
    marginHorizontal: 10,
  },
});


import { StyleSheet, Text, View, Button, Alert, TouchableOpacity,Modal} from 'react-native'
import React from 'react';
import { useState } from 'react'; 
import StyledButton, {} from "../../shared/StyledButton";
import { BodyLargeTextSemiBold, BodyMediumText, } from "../../shared/StyledText";
import colors from '../../../theme/colors';

const CloseBNIScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModalBNI = () => {
    setModalVisible(true);
  };

  const closeModalBNI = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Testing Modal Screen LogOut BNI mobile</Text>
      <View style={styles.buttonYes}>
        <StyledButton mode='primary' title='Log Out BNI' onPress={openModalBNI}
        />
      </View>

      <Modal
        isOpen={isModalVisible}
        onClosed={closeModalBNI}
        style={styles.modalContainer}
        backdropPressToClose = {false}
        swipeToClose = {false}
      >
        <BodyLargeTextSemiBold style={styles.headerText}>Konfirmasi</BodyLargeTextSemiBold>
        <BodyMediumText style={styles.messageText}>
          Anda yakin ingin keluar dari aplikasi ini?
        </BodyMediumText>
        <View style={styles.viewButton}>
          <View style={styles.buttonNo}>
           <StyledButton mode='primary-outlined' title='Tidak' onPress={closeModalBNI}
            /> 
          </View>
          <View style={styles.buttonYes}>
           <StyledButton mode='primary' title='Ya' onPress={closeModalBNI}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CloseBNIScreen

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
  headerText: {
    color: colors.primary.primaryOne,
    marginBottom: 20,
  },
  messageText: {
    width: '77%',
    textAlign: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
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


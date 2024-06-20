import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native'
import React from 'react';
import { useState } from 'react';
import Modal from 'react-native-modalbox';
import StyledButton, {} from "../../components/shared/StyledButton";
import {  BodyRegularText, } from "../../components/shared/StyledText";
import colors from '../../theme/colors';


const CloseLimitScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModalLimitValas = () => {
    setModalVisible(true);
  };

  const closeModalLimitValas = () => {
    setModalVisible(false);
  };

  const B = (props) => <Text style={{fontWeight: 'bold', fontSize: 17}}>{props.children}</Text>

  return (
    <View style={styles.container}>
      <Text>Testing Modal Screen Limit BNI Valas Plus</Text>
      <View style={styles.buttonBack}>
        <StyledButton mode='primary' title='Limit BNI Valas' onPress={openModalLimitValas}
        />
      </View>

      <Modal
        isOpen={isModalVisible}
        onClosed={closeModalLimitValas}
        style={styles.modalContainer}
        backdropPressToClose = {false}
        swipeToClose = {false}
      >
        <Image
          source={require("../../../assets/limit.png")}
          style={styles.icon}
        />
        <BodyRegularText style={styles.messageText}>
          Limit <B>SGD 33.600</B> pembelian valas bulanan Anda sudah habis.
        </BodyRegularText>
        <View style={styles.viewButton}>
          <StyledButton mode='primary' title='Kembali' onPress={closeModalLimitValas}
          />
        </View>
      </Modal>
    </View>
  );
}

export default CloseLimitScreen

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
    width: '88%',
    textAlign: 'center',
    color: colors.primary.primaryOne,
    marginTop: 10,
    lineHeight: 20,
  },
  viewButton: {
    width:'48%',
    justifyContent: 'center',
    marginTop: 20,
  },
});


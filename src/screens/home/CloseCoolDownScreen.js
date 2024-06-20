import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native'
import React from 'react';
import { useState } from 'react';
import Modal from 'react-native-modalbox';
import StyledButton, {} from "../../components/shared/StyledButton";
import { BodyRegularText,} from "../../components/shared/StyledText";
import colors from '../../theme/colors';


const CloseCoolDownScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModalCoolDown = () => {
    setModalVisible(true);
  };

  const closeModalCoolDown = () => {
    setModalVisible(false);
  };

  const B = (props) => <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.children}</Text>

  return (
    <View style={styles.container}>
      <Text>Testing Modal Screen Cool Down BNI Valas Plus</Text>
      <View style={styles.buttonBack}>
        <StyledButton mode='primary' title='Cool Down Valas' onPress={openModalCoolDown}
        />
      </View>

      <Modal
        isOpen={isModalVisible}
        onClosed={closeModalCoolDown}
        style={styles.modalContainer}
        backdropPressToClose = {false}
        swipeToClose = {false}
      >
        <Image
          source={require("../../../assets/cool-down.png")}
          style={styles.icon}
        />
        <BodyRegularText style={styles.messageText}>
          Fitur ini masih terkunci <B>selama 3 hari</B> karena ketidakhadiran Anda pada reservasi sebelumnya.
        </BodyRegularText>
        <View style={styles.viewButton}>
          <StyledButton mode='primary' title='Kembali' onPress={closeModalCoolDown}
          />
        </View>
      </Modal>
    </View>
  );
}

export default CloseCoolDownScreen

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
    lineHeight: 18,
  },
  viewButton: {
    width:'48%',
    justifyContent: 'center',
    marginTop: 20,
  },
});
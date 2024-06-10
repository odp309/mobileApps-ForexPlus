import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = ({style,onPress,color,hasConfirmation}) => {
  const alertConfirmation = () => {
    Alert.alert(
      "Anda Ingin Membatalkan Transaksi?",
      "",
      [
        {
          text: "Tidak", 
          style: "cancel"
        },
        {
          text: "Ya",
          onPress : onPress
        }
      ],
      { cancelable: false }
    );
  }
  return (
    <View>
      <TouchableOpacity
        style={style}
        onPress={hasConfirmation ? ()=>alertConfirmation() : onPress}
      >
        <Ionicons name="arrow-back" size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});

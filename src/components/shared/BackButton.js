import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = ({style,onPress,color,hasConfirmation,setModalVisible}) => {
  useEffect(()=>{
    console.log("ModalVisible : ",setModalVisible)
  },[])
  return (
    <View>
      <TouchableOpacity
        style={style}
        onPress={hasConfirmation ? setModalVisible : onPress}
      >
        <Ionicons name="arrow-back" size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});

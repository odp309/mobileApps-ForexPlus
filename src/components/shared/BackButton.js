import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = ({style,onPress,color}) => {
  return (
    <View>
      <TouchableOpacity
        style={style}
        onPress={onPress}
      >
        <Ionicons name="arrow-back" size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});

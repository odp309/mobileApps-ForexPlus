import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  BodyMediumText,
  BodyRegularText,
  BodyRegularTextBold,
  BodyRegularTextSemiBold,
  BodyXLTextSemiBold,
} from "../shared/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "@rneui/themed";
import colors from "../../theme/colors";

const HeaderProfile = ({ user, fullName }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 99,
          backgroundColor: colors.primary.primaryTwo,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BodyXLTextSemiBold
          style={{ fontSize: 30, textAlign: "center", color: "white" }}
        >
          {fullName.substring(0, 1)}
        </BodyXLTextSemiBold>
      </View>
      <View style={{ marginLeft: 25, justifyContent: "center" }}>
        <View>
          <BodyRegularText>Selamat Datang</BodyRegularText>
          <BodyMediumText>{fullName}</BodyMediumText>
        </View>
      </View>
    </View>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    margin: 8,
    marginHorizontal: 20,
  },
  logoStyle: {},
});

import { Image, StyleSheet, Text, View } from "react-native";
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
      {user === null ? (
        <Skeleton
          variant="circular"
          style={{
            borderRadius: 99,
            height: 60,
            width: 60,
            backgroundColor: "lightGrey",
          }}
        />
      ) : (
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 99,
            backgroundColor: colors.primary.primaryTwo,
            justifyContent:"center", 
            alignItems:"center"
          }}
        >
          <BodyXLTextSemiBold style={{fontSize:30,textAlign:"center",color:"white"}}>{fullName.substring(0, 1)}</BodyXLTextSemiBold>
        </View>
      )}
      <View style={{ marginLeft: 25, justifyContent: "center" }}>
        {user === null ? (
          <View>
            <Skeleton
              style={{ backgroundColor: "lightGrey" }}
              variant="circular"
              width={120}
              height={20}
            />
            <Skeleton
              style={{ backgroundColor: "lightGrey" }}
              variant="rectangular"
              width={150}
              height={25}
            />
          </View>
        ) : (
          <>
            <BodyRegularText>Selamat Datang</BodyRegularText>
            <BodyMediumText>{fullName}</BodyMediumText>
          </>
        )}
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

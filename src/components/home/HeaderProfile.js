import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  BodyMediumText,
  BodyRegularText,
  BodyRegularTextBold,
  BodyRegularTextSemiBold,
} from "../shared/StyledText";
import { userData } from "../../auth/service/AuthService";

const HeaderProfile = () => { 
  const [user,setUser] = useState(null);
  const [fullName,setFullName] = useState("");
  useState(()=>{
    setUser(userData);
    setFullName(userData.firstName+" "+userData.lastName);
  },[])
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
          alignSelf: "center",
        }}
        resizeMode="contain"
        source={require("../../../assets/me.jpg")}
      />
      <View style={{ marginLeft: 25, justifyContent: "center"}}>
        <BodyRegularText>Selamat Datang</BodyRegularText>
        <BodyMediumText>
          {user === null ? "Reloading..." : fullName}
        </BodyMediumText>
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
    margin: "2%",
    marginHorizontal: "5%",
  },
  logoStyle: {},
});

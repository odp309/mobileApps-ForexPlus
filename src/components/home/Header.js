import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";

const Header = ({ user }) => {
  return (
    <View style={styles.container}>
      {user === null ? (
        <>
          <Skeleton
            variant="circular"
            style={{
              width: 90,
              backgroundColor: "lightGrey",
              height: 40,
              alignSelf: "center",
            }}
          />
          <Skeleton
            variant="circular"
            style={{
              width: 22,
              backgroundColor: "lightGrey",
              height: 40,
              alignSelf: "center",
            }}
          />
        </>
      ) : (
        <>
          <Image
            style={{ width: 90, height: 40, alignSelf: "center" }}
            resizeMode="center"
            source={{ uri: "https://i.imgur.com/rkL9Et5.png" }}
          />
          <Image
            style={{ width: 22, height: 40, alignSelf: "center" }}
            resizeMode="center"
            source={{ uri: "https://i.imgur.com/HXlTT4D.png" }}
          />
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 8,
  },
  logoStyle: {},
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../../shared/BackButton";
import { BodyXLTextSemiBold } from "../../shared/StyledText";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ContentHeader = ({
  title,
  ignoreBackButton,
  hasConfirmation,
  hasRigtIcon,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!ignoreBackButton && (
        <BackButton
          hasConfirmation={hasConfirmation}
          style={{ width: 50 }}
          onPress={() => navigation.goBack()}
          color={colors.color.black}
        />
      )}
      <View style={styles.titleContainer}>
        {hasRigtIcon && (
          <View style={{ flex: 1 }} />
        )}
        <BodyXLTextSemiBold style={styles.title}>{title}</BodyXLTextSemiBold>

        {hasRigtIcon && (
          <View style={styles.iconContainer}>
            <Ionicons
              name="options"
              size={28}
              style={styles.icon}
              color={colors.primary.primaryOne}
            />
            <MaterialIcons
              name="download"
              size={28}
              color={colors.primary.primaryOne}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ContentHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  icon: {
    marginHorizontal: 10, // Adds some space between the icons
  },
});

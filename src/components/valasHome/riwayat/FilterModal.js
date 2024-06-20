import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet } from "@rneui/themed";

import React, { useState } from "react";
import {
  BodyLargeText,
  BodyLargeTextSemiBold,
  BodyRegularText,
} from "../../shared/StyledText";
import StyledButton from "../../shared/StyledButton";
import colors from "../../../theme/colors";
import RadioButton from "../../shared/RadioButton";
import RangeOptions from "./RangeOptions";

let today = new Date();

const TIME_RANGE = [
  {
    id: "1",
    title: "Hari ini",
    chosenStatus: false,
    priorDate: today,
  },
  {
    id: "2",
    title: "7 Hari Terakhir",
    chosenStatus: false,
    priorDate: new Date(new Date().setDate(today.getDate() - 7)),
  },
  {
    id: "3",
    title: "30 Hari Terakhir",
    chosenStatus: false,
    priorDate: new Date(new Date().setDate(today.getDate() - 30)),
  },
];

const FilterModal = ({ isModalShown, toggleBottomSheet, handleFilter }) => {
  const [chosenFilter, setChosenFilter] = useState("Transfer");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPriorDate, setSelectedPriorDate] = useState(null);

  const handleApplyButton = () => {
    const filter = {
      type: chosenFilter,
      range: selectedPriorDate,
    };
    handleFilter(filter);
    toggleBottomSheet();
  };

  const receiveRange = (data) => {
    const priorDate = TIME_RANGE[parseInt(data) - 1].priorDate;
    console.log("priorDate: ", priorDate);
    // console.log(priorDate);
    setSelectedPriorDate(priorDate);
    setSelectedOption(data);
  };

  return (
    <BottomSheet isVisible={isModalShown}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <BodyLargeTextSemiBold>Kategori</BodyLargeTextSemiBold>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.borderStyling}>
            <View style={styles.transactionChoice}>
              <TouchableOpacity onPress={() => setChosenFilter("Transfer")}>
                <BodyLargeText
                  style={[
                    chosenFilter === "Transfer"
                      ? styles.chosenOption
                      : styles.notChosenOption,
                  ]}
                >
                  Transfer
                </BodyLargeText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChosenFilter("Beli")}>
                <BodyLargeText
                  style={[
                    chosenFilter === "Beli"
                      ? styles.chosenOption
                      : styles.notChosenOption,
                  ]}
                >
                  Beli
                </BodyLargeText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChosenFilter("Jual")}>
                <BodyLargeText
                  style={[
                    chosenFilter === "Jual"
                      ? styles.chosenOption
                      : styles.notChosenOption,
                  ]}
                >
                  Jual
                </BodyLargeText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChosenFilter("Tarik")}>
                <BodyLargeText
                  style={[
                    chosenFilter === "Tarik"
                      ? styles.chosenOption
                      : styles.notChosenOption,
                  ]}
                >
                  Tarik
                </BodyLargeText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 24, marginBottom: 14 }}>
            <BodyLargeTextSemiBold>Rentang Waktu</BodyLargeTextSemiBold>
          </View>

          <RangeOptions
            title={TIME_RANGE[0].title}
            handleRange={receiveRange}
            selectedOption={selectedOption}
            optionId={TIME_RANGE[0].id}
          />
          <RangeOptions
            title={TIME_RANGE[1].title}
            handleRange={receiveRange}
            selectedOption={selectedOption}
            optionId={TIME_RANGE[1].id}
          />
          <RangeOptions
            title={TIME_RANGE[2].title}
            handleRange={receiveRange}
            selectedOption={selectedOption}
            optionId={TIME_RANGE[2].id}
          />
        </View>

        <View style={styles.bottomContainer}>
          {/* JUAL BUTTON */}
          <StyledButton
            mode={"primary"}
            title={"Terapkan"}
            size={"lg"}
            onPress={handleApplyButton}
            style={{ marginVertical: "5%" }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topContainer: {
    width: "100%",
  },
  middleContainer: { width: "100%" },
  bottomContainer: {
    width: "100%",
  },
  transactionChoice: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    position: "relative",
    top: 5,
  },
  borderStyling: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderBottomWidth: 2,
    borderColor: colors.color.lightGrey,
  },
  chosenOption: {
    color: colors.primary.primaryOne,
    // backgroundColor:'black',
    borderBottomWidth: 5,
    borderColor: colors.primary.primaryOne,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  notChosenOption: {
    color: colors.color.lightGrey,
  },
});

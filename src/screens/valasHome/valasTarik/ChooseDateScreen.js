import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import StyledButton from "../../../components/shared/StyledButton";
import { useEffect, useState } from "react";
import colors from "../../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  BodyLargeText,
  BodyMediumText,
  HeadingSixText,
} from "../../../components/shared/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import CalendarPicker from "react-native-calendar-picker";
import { Calendar } from "react-native-calendars";
import { getDaysInMonth } from "date-fns";
import sizes from "../../../theme/sizes";

const DIMENSION_WIDTH = Dimensions.get("screen").width;
const RESERVATION_LENGTH = 6;

const ChooseDateScreen = () => {
  const [isCalendarShown, setIsCalendarShown] = useState(false);

  // For Calendar States
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [weekendsArray, setWeekendsArray] = useState([]);
  const [minDateState, setMinDateState] = useState("");
  const [maxDateState, setMaxDateState] = useState("");

  useEffect(() => {
    const today = new Date();
    const todayForMaxDate = new Date();
    const todayForMinDate = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const hour = today.getHours();

    let minDate = today;
    if (hour >= 15) {
      minDate = new Date(
        todayForMinDate.setDate(todayForMinDate.getDate() + 1)
      );
    }

    const maxDate = new Date(
      todayForMaxDate.setDate(todayForMaxDate.getDate() + RESERVATION_LENGTH)
    );

    // Set Minimal Date (Disable Dates before Minimal Date) & Maximal Date (Disable Dates after Max Date)
    setMaxDateState(maxDate.toISOString());
    setMinDateState(minDate.toISOString());

    let disabledDates = [];

    // Set Current Date for the Calendar Styling
    const todayStr = minDate.toISOString();
    const sliceToday = todayStr.slice(0, 10);
    setCurrentDate(sliceToday);

    const searchWeekendsForOneYear = () => {
      // Loop through each day in the current year
      for (let i = 1; i <= 365; i++) {
        const tempDate = new Date(year, month, i);
        const dayOfWeek = tempDate.getDay();

        // Disable Sundays (1) and Saturdays (0)
        if (dayOfWeek === 0 || dayOfWeek === 1) {
          const newTemptDate = tempDate.toISOString();
          const sliceTemptDate = newTemptDate.slice(0, 10);

          disabledDates.push(sliceTemptDate);
        }
      }
      setWeekendsArray(disabledDates);
    };

    searchWeekendsForOneYear();
    disabledDates = [];
  }, []);

  const onDateChange = (data) => {
    // Calendar Picker
    // const newDate = data.toISOString();
    // setSelectedDate(newDate);

    // Calendar
    setSelectedDate(data.dateString);
  };

  const onChooseDatePress = () => {
    setIsCalendarShown(!isCalendarShown);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Tarik Valas" />
      </View>

      <View style={styles.middleContainer}>
        {/* Title and SearchBar */}
        <View style={styles.titleSearchContainer}>
          <HeadingSixText
            style={{
              fontWeight: "bold",
              color: colors.primary.primaryOne,
              marginBottom: 10,
            }}
          >
            Pilih Hari Kedatangan
          </HeadingSixText>
          {/* Choose Date */}
          <TouchableOpacity
            style={styles.chooseDate}
            onPress={onChooseDatePress}
          >
            <BodyMediumText style={{ color: colors.color.grey }}>
              Pilih Tanggal
            </BodyMediumText>
            <View style={styles.searchIcon}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={30}
                color={colors.color.grey}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        {isCalendarShown && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDateChange}
              theme={{
                textMonthFontWeight: "bold",
                textMonthFontSize: sizes.font.xl,
                monthTextColor: colors.color.black,
                todayTextColor: colors.color.lightGrey, // Today Color, default is Blue
                
              }}
              firstDay={1}
              markingType="custom"
              minDate={minDateState}
              maxDate={maxDateState}
              markedDates={{
                [selectedDate]: {
                  customStyles: {
                    container: {
                      backgroundColor: colors.primary.primaryOne,
                    },
                    text: {
                      color: colors.color.white,
                    },
                  },
                },
                ...(selectedDate === currentDate ? {

                  [currentDate]: {
                    customStyles: {
                      container: {
                        backgroundColor: colors.primary.primaryOne,
                      },
                      text: {
                        color: colors.color.white,
                      },
                    },
                  }
                } : {
                  [currentDate]: {
                    customStyles: {
                      container: {
                        backgroundColor: colors.primary.primaryThree,
                      },
                      text: {
                        color: colors.primary.primaryOne,
                      },
                    },
                  }
                }),
                // Mark weekends as disabled
                ...weekendsArray.reduce((acc, date) => {
                  acc[date] = { disabled: true, disableTouchEvent: true };
                  return acc;
                }, {}),
              }}
            />
          </View>
        )}
        {/* <View>
          <BodyMediumText>SELECTED DATE:{selectedDate}</BodyMediumText>
        </View> */}
      </View>

      <View style={styles.bottomContainer}>
        {selectedDate === "" ? (
          <StyledButton
            mode="primary-disabled"
            title="Lanjut"
            size={"lg"}
            style={{ marginBottom: 20 }}
          />
        ) : (
          <StyledButton
            mode="primary"
            title="Lanjut"
            size={"lg"}
            onPress={() => {}}
            style={{ marginBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
};

export default ChooseDateScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "15%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
  },
  titleSearchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    width: "100%",
  },
  chooseDate: {
    width: "100%",
    minHeight: 50,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.color.lightGrey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchIcon: {
    // paddingHorizontal: 20,
  },
  calendarContainer: {
    width: DIMENSION_WIDTH - 40,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.primaryOne,
  },
  selectedDateColor: {
    backgroundColor: colors.primary.primaryOne,
    color: colors.color.white,
  },
});

import { Calendar } from "react-native-calendars";
import colors from "../../../theme/colors";
import { StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";
import sizes from "../../../theme/sizes";

const DIMENSION_WIDTH = Dimensions.get("screen").width;

const CalendarComponent = ({
  isCalendarShown,
  onDateChange,
  minDateState,
  maxDateState,
  selectedDate,
  currentDate,
  weekendsArray,
}) => {
  return (
    <View>
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
              ...(selectedDate === currentDate // If Selected Date is the same as Current Date, then the Selected Date Style Wins
                ? {
                    [currentDate]: {
                      customStyles: {
                        container: {
                          backgroundColor: colors.primary.primaryOne,
                        },
                        text: {
                          color: colors.color.white,
                        },
                      },
                    },
                  }
                : {
                    [currentDate]: {
                      customStyles: {
                        container: {
                          backgroundColor: colors.primary.primaryThree,
                        },
                        text: {
                          color: colors.primary.primaryOne,
                        },
                      },
                    },
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
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  calendarContainer: {
    width: DIMENSION_WIDTH - 40,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.primaryOne,
  },
});

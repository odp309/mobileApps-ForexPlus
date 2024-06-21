import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import StyledButton from "../../../components/shared/StyledButton";
import { useEffect, useState } from "react";
import PullConfirmationModal from "../../../components/valasHome/valasTarik/PullConfirmationModal";
import CalendarComponent from "../../../components/valasHome/valasTarik/CalendarComponent";
import TitleAndChooseButton from "../../../components/valasHome/valasTarik/TitleAndChooseButton";
import { useRoute } from "@react-navigation/native";

let RESERVATION_LENGTH = 5;

const ChooseDateScreen = () => {
  const route = useRoute();
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const { transactionData,selectedBranch } = route.params;

  // For Calendar States
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [weekendsArray, setWeekendsArray] = useState([]);
  const [minDateState, setMinDateState] = useState("");
  const [maxDateState, setMaxDateState] = useState("");

  useEffect(()=>{
    console.log(selectedBranch)
  },[])

  useEffect(() => {
    const today = new Date();
    const todayForMaxDate = new Date();
    const todayForMinDate = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const hour = today.getHours();
    let minDate = today;

    
    if (hour >= 15) {
      RESERVATION_LENGTH = 6;
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
    // Calendar
    setSelectedDate(data.dateString);
    setIsCalendarShown(!isCalendarShown);
  };

  const onChooseDatePress = () => {
    setIsCalendarShown(!isCalendarShown);
  };

  const toggleBottomSheet = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Tarik Valas" />
      </View>

      <View style={styles.middleContainer}>
        {/* Title and Calendar Button */}
        <TitleAndChooseButton onChooseDatePress={onChooseDatePress} dateValue={selectedDate} />

        {/* Calendar */}
        <CalendarComponent
          isCalendarShown={isCalendarShown}
          onDateChange={onDateChange}
          minDateState={minDateState}
          maxDateState={maxDateState}
          selectedDate={selectedDate}
          currentDate={currentDate}
          weekendsArray={weekendsArray}
        />

        <PullConfirmationModal
          modalVisibility={modalVisibility}
          toggleBottomSheet={toggleBottomSheet}
          branchData={selectedBranch}
          transactionType={"tarik"}
          date={selectedDate}
          transactionData={transactionData}
        />
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
            onPress={toggleBottomSheet}
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
    height: Dimensions.get("window").height*1.05,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "10%",
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
});

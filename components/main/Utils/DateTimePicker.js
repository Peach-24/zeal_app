import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateSelect = (props) => {
  // Setting default time to be midnight on the day selected
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(d);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(Platform.OS === "ios");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    props.handleDateChange(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
<<<<<<< HEAD
        <Button onPress={showDatepicker} title="Show date picker!" />
=======
        <Button onPress={showDatepicker} title="Select Start Date" />
>>>>>>> f9e664ec79ecdc813ceb766ce4105adcae73f2c4
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
<<<<<<< HEAD
          display="default"
=======
          display="calendar"
>>>>>>> f9e664ec79ecdc813ceb766ce4105adcae73f2c4
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateSelect;

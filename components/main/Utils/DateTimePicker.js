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
        <Button onPress={showDatepicker} title="Select Start Date" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="calendar"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateSelect;

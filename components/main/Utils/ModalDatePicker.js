import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import format from "date-fns/format";

const ModalDatePicker = (props) => {
  // Setting default time to be midnight on the day selected
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const [chosenDate, setChosenDate] = useState(d);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const formattedDate = format(chosenDate, "dd/MM/yyyy");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const newDate = date || chosenDate;
    setChosenDate(newDate);
    props.handleDateChange(newDate);
    hideDatePicker();
  };

  return (
    <View>
      <Button title={formattedDate} onPress={showDatePicker} />
      <DateTimePickerModal
        date={chosenDate}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default ModalDatePicker;

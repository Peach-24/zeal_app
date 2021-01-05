import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Main = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black',
  },
  tabIcon: {
    fontSize: 26,
    color: 'white',
  },
});

export default Main;

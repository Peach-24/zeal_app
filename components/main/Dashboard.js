import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Button
        title="Search for a group"
        onPress={() =>
          navigation.navigate('Groups', { screen: 'SearchGroups' })
        }
      />
      <Button
        title="Create a group"
        onPress={() => navigation.navigate('Groups', { screen: 'CreateGroup' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Dashboard;

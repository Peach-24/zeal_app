import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DashboardScreen from "./main/Dashboard";
import ActivityScreen from "./main/Activity";
import GroupsScreen from "./main/Groups";
import ProfileScreen from "./main/Profile";

const Tab = createMaterialBottomTabNavigator();

import store from "./main/redux/store";
import { fetchUser } from "./main/redux/reducers/userSlice";
import { fetchGroupsJoined } from "./main/redux/reducers/groupsSlice";
// Once in main, we want to add the current user and their joined groups to the store

const Main = () => {
  store.dispatch(fetchUser());
  store.dispatch(fetchGroupsJoined());
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        backBehavior="history"
        labeled={false}
        shifting={false}
        barStyle={styles.tabBar}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              let iconName = `home-circle${focused ? "" : "-outline"}`;
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  style={styles.tabIcon}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              let iconName = `view-dashboard${focused ? "" : "-outline"}`;
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  style={styles.tabIcon}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              let iconName = `account-group${focused ? "" : "-outline"}`;
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  style={styles.tabIcon}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              let iconName = `account-circle${focused ? "" : "-outline"}`;
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  style={styles.tabIcon}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "black",
  },
  tabIcon: {
    fontSize: 26,
    color: "white",
  },
});

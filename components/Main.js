import React, { Component, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DashboardScreen from "./main/Dashboard";
import ActivityScreen from "./main/Activity";
import GroupsScreen from "./main/Groups";
import ProfileScreen from "./main/Profile";

const Tab = createMaterialBottomTabNavigator();

import store from "../App";
import { fetchUser, fetchGroups } from "../redux/actions/index";
// Once in main, we want to add the current user and their joined groups to the store
fetchUser();
fetchGroups();

const Main = () => {
  // componentDidMount() {
  //   this.props.fetchUser();
  //   this.props.fetchGroups();
  // }
  //const [currentUser, setCurrentUser] = useState(fetchUser());

  // const { currentUser, navigation } = this.props;
  // will only happen if there is an application error
  // if (currentUser === undefined) {
  //   return <View />;
  // }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        backBehavior="history"
        labeled={false}
        shifting={false}
        barStyle={styles.tabBar}>
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

// replace these with useSelector

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
// });

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchUser, fetchGroups }, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(Main);

import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, signOut } from "../redux/actions/index";

import DashboardScreen from "./main/Dashboard";
import ActivityScreen from "./main/Activity";
import GroupsScreen from "./main/Groups";
import ProfileScreen from "./main/Profile";

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser, navigation } = this.props;
    if (currentUser === undefined) {
      return <View />;
    }
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
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "black",
  },
  tabIcon: {
    fontSize: 26,
    color: "white",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

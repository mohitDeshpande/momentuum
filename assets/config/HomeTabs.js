import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 6.2.2
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation"; // 1.0.0-beta.27
import CaseList from "../../screens/CaseList/components/CaseList";
import Test from "../../screens/CaseList/components/Test";
import ClientList from "../../screens/clients/components/ClientList";
import AddClient from "../../screens/clients/components/AddClient";
import AddCase from "../../screens/AddCase/components/AddCase";
import Profile from "../../screens/Profile/components/Profile";
import CaseItems from "../../screens/CaseDetails/components/CaseItems";
import CaseItemDemo from "../../screens/CaseDetails/components/CaseItemDemo";
import CaseItemDetails from "../../screens/CaseItemDetails/components/CaseItemDetails";
import Integrate from "../../screens/CaseDetails/components/Integrate";
import ClientDetails from "../../screens/CaseDetails/components/ClientDetails";
import FormGenerator from "../../screens/CaseDetails/components/FormGenerator";
import TestCaseDetails from "../../screens/CaseDetails/components/TestCaseDetails";
import CaseUpdateForm from "../../screens/CaseDetails/components/CaseUpdateForm";

const HomeStack = StackNavigator(
  {
    CaseList: {
      screen: CaseList,
      title: "CaseList"
    },
    CaseDetails: {
      screen: Integrate
    },
    CaseUpdateForm: {
      screen: CaseUpdateForm
    },
    CaseItemDetails: {
      screen: CaseItemDetails
    },
    CaseItems: {
      screen: CaseItems
    },
    CaseItemDemo: {
      screen: CaseItemDemo
    },
    ClientList: {
      screen: ClientList,
      title: "ClientList"
    },
    AddCase: {
      screen: AddCase,
      title: "AddCase"
    },
    AddClient: {
      screen: AddClient,
      title: "AddClient"
    }
  },
  {
    initialRouteName: "CaseList",
    headerMode: "none"
  }
);

export default (tabnav = TabNavigator(
  {
    Home: { screen: HomeStack },
    Add: { screen: ClientList },
    Profile: { screen: Profile }
  },
  {
    headerMode: "screen",
    initialRouteName: "Home",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Add") {
          iconName = `ios-add-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Profile") {
          iconName = `ios-person${focused ? "" : "-outline"}`;
        }
        return <Ionicons name={iconName} size={30} color={tintColor} />;
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#3385ff",
      inactiveTintColor: "#3385ff"
    },
    tabBarLabel: "none",
    animationEnabled: false,
    swipeEnabled: false
  }
));

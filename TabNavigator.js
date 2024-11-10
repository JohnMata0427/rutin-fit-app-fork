import React from "react";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./components/Home";
import { Perfil } from "./components/Perfil";
import { Chat } from  "./components/Chat";
import { Rutinas } from  "./components/Rutinas";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") iconName = focused ? "home" : "home-outline";
                else if (route.name === "Perfil")  iconName = focused ? "person" : "person-outline";
                else if (route.name === "Chat") iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                else if (route.name === "Rutinas") iconName = focused ? "fitness" : "fitness-outline";
                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: "#82E5B5",
            tabBarInactiveTintColor: "gray",
            headerShown: false
        })}
        >
            <Tab.Screen  name="Home" component={Home} />
            <Tab.Screen name="Rutinas" component={Rutinas} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
}
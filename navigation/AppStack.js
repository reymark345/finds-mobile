import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LinearGradient from "react-native-linear-gradient";

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/oldScreens/ChatScreen';
import ProfileScreen from '../screens/oldScreens/ProfileScreen';
import AddPostScreen from '../screens/oldScreens/AddPostScreen';
import MessagesScreen from '../screens/oldScreens/MessagesScreen';
import EditProfileScreen from '../screens/oldScreens/EditProfileScreen';
import TevDetail from '../screens/Tev/TevDetail';
import Transaction from '../screens/Transaction/Transaction';
import NetInfo from "@react-native-community/netinfo";
import CustomAlert from '../components/CustomAlert';
import TextBlastScreen from '../screens/TextQuery/TextQ';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import QrScan from '../screens/Qrcode/QrScan';
import CustomDrawer from '../components/CustomDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, icons } from "../constants"



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{
          width: 60,
          height: 60,
          borderRadius: 35
        }}
      >
        {children}
      </LinearGradient>

    </TouchableOpacity>
  )
}

const FeedStack = ({ navigation }) => (

  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false
    }}>


    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            {/* <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            /> */}
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
      drawerIcon
    />

    <Drawer.Screen name="Profile" component={SettingsScreen} />
    <Drawer.Screen name="Transaction" component={ProfileScreen} />
    <Drawer.Screen name="Qr Code" component={QrScan} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />


    <Stack.Screen
      name="AddPost"
      component={HomeScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="tev"
      component={TevDetail}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="textblast"
      component={TextBlastScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="trans"
      component={Transaction}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Drawer.Navigator>
);

const MessageStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [internetCon, setNet] = useState(true);
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    // checkInternetConnection();
    { checkInternetConnection() }
  }, [])

  function checkInternetConnection() {
    // setModalVisible(true);
    // setNet(false); 
    NetInfo.addEventListener(state => {
      if (state.isConnected == false) {
        console.log("Connection types", state.type);
        // testAlert();
      }
    })

    return (
      <View>
        <CustomAlert
          modalVisible={true}
          setModalVisible={true}
          title={'Message'}
          message={'Your device appears to have no internet connectivity. Please check your connection settings and try again'}
          buttons={[{
            text: 'Retry',
            func: () => { checkInternetConnection(); }
          }]}
        />
      </View>
    )
  }

  return (

    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            height: 60
          },
          null
        ],
        headerShown: false
      }}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 100
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 60
            }}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 20,
                  tintColor: focused ? COLORS.
                    primary : COLORS.black
                }}
              />
              <Text style={{
                color: focused ? COLORS.
                  primary : COLORS.black, ...FONTS.body5
              }}
              >HOME</Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={MessageStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 70
            }}>
              <Image
                source={icons.pie_chart}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 20,
                  tintColor: focused ? COLORS.
                    primary : COLORS.black
                }}
              />
              <Text style={{
                color: focused ? COLORS.
                  primary : COLORS.black, ...FONTS.body5
              }}
              >PORTFOLIO</Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.transaction}
              resizeMode="contain"
              style={{
                width: 25,
                height: 20,
                tintColor: COLORS.white
              }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }}

      />
      <Tab.Screen
        name="Prices"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40
            }}>
              <Image
                source={icons.line_graph}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 20,
                  tintColor: focused ? COLORS.
                    primary : COLORS.black
                }}
              />
              <Text style={{

                color: focused ? COLORS.
                  primary : COLORS.black, ...FONTS.body5
              }}
              >STATS</Text>
            </View>
          )
        }}

      />
      <Tab.Screen
        name="Settings"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 65
              }}
            >
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 20,
                  tintColor: focused ? COLORS.
                    primary : COLORS.black
                }}
              />
              <Text
                numberOfLines={1}
                style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5 }}>
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})

export default AppStack;

import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TevDetail from '../screens/TevDetail';
import Transaction from '../screens/Transaction';
import NetInfo from "@react-native-community/netinfo";
import CustomAlert from '../components/CustomAlert';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen
      name="FINDS"
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
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
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
          <View style={{marginLeft: 15}}>
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
          <View style={{marginLeft: 15}}>
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
        <View style={{marginLeft: 15}}>
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
        <View style={{marginLeft: 15}}>
          <Ionicons name="arrow-back" size={25} color="#2e64e5" />
        </View>
      ),
    }}
  />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
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

  React.useEffect(()=>{
    // checkInternetConnection();
    {checkInternetConnection()}
  }, [])

  function checkInternetConnection() {
    // setModalVisible(true);
    // setNet(false); 
    
    return(
      <View>
        <CustomAlert 
        modalVisible={true} 
        setModalVisible={true}
        title={'Message'}
        message={'Your device appears to have no internet connectivity. Please check your connection settings and try again'} 
        buttons={[{
          text: 'Retry',
          func: () => {checkInternetConnection();}
        }]}
      />
      </View>
    )}
  


 

  return (
   
    <Tab.Navigator
      screenOptions={{
      headerShown: false
      }}
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
            
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
    // <View>{checkInternetConnection()}</View>

  );
};

export default AppStack;

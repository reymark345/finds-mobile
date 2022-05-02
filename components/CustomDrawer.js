import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../navigation/AuthProvider';

const CustomDrawer = props => {

  const [loading, setLoading] = useState(true);
  const [googleUsername, setState] = useState({ GoogleUsername: '' });
  const [googlePhoto, setPhoto] = useState({ GooglePhoto: '' });
  const [googleEmail, setEmail] = useState({ GoogleEmail: '' });
  const { clearPin, logout } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      AsyncStorage.getItem('userPrivilege').then((variable) => {
        if (variable != null) {
          setState({ GoogleUsername: variable })
        }
      });
      AsyncStorage.getItem('userPrivilegePhoto').then((varPhoto) => {
        if (varPhoto != null) {
          setPhoto({ GooglePhoto: varPhoto })
        }
      });
      AsyncStorage.getItem('userPrivilegeEmail').then((varEmail) => {
        if (varEmail != null) {
          console.log("hall");
          console.log(varEmail);
          setEmail({ GoogleEmail: varEmail })
        }
        else {
          console.log("hall");
        }
      });
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{ padding: 20 }}>
          <Image
            source={{ uri: googlePhoto?.GooglePhoto }}
            // source={require('../assets/images/user-profile.jpg')}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {googleUsername?.GoogleUsername}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {googleEmail?.GoogleEmail}
            </Text>
            <FontAwesome5 name="envelope" size={15} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => clearPin()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="settings" size={20} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Reset Pin
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

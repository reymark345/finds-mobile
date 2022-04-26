import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';


import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const TextBlastScreen = ({ navigation }) => {
  return (
    <SkeletonPlaceholder


    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 80, height: 80, borderRadius: 50, marginTop: '20%', marginLeft: `20%` }} />
        <View style={{ marginLeft: 20, marginTop: '8%' }}>

          <View style={{ width: 130, height: 25, borderRadius: 4 }} />
          <View
            style={{ marginTop: 6, width: 90, height: 25, borderRadius: 4 }}
          />
        </View>

      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 300, height: 65, marginTop: '10%', marginLeft: `10%` }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 300, height: 65, marginTop: '10%', marginLeft: `10%` }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 300, height: 65, marginTop: '10%', marginLeft: `10%` }} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 300, height: 150, marginTop: '10%', marginLeft: `10%` }} />
      </View>

      {/* <View style={{ width: `85%`, height: `40%`, marginTop: '10%', marginLeft: `8%` }}>



</View> */}
    </SkeletonPlaceholder>
  );
};

export default TextBlastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

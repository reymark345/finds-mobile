import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  ScrollView,
  SafeAreaView
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}>
        <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
            />
            <View
              style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
            />
          </View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
            />
            <View
              style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
            />
          </View>
        </SkeletonPlaceholder>
      </ScrollView>

    </SafeAreaView>
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

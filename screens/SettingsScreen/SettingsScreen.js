import React from 'react';
import { View, Text } from 'react-native';
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../../constants';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...FONTS.h4 }}>Settings Screen </Text>
    </View>

  );
};
export default SettingsScreen;
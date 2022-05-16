import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Animated,
    LogBox
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

const TextButton = ({ label, customContainerStyle, customLabelStyle, onPress, height }) => {
    return (
        <TouchableOpacity
            style={{
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.green,
                ...customContainerStyle
            }}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...customLabelStyle }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;
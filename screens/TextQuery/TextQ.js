import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Timeline from 'react-native-timeline-flatlist'
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../../constants';



const TextQ = ({ navigation }) => {

  const datas = [
    { time: '09:00', title: 'Incoming - September 01, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#3ab54a', circleColor: '#3ab54a' , icon: require('../../assets/icons/checks.png') },
    { time: '10:45', title: 'Obligate - October 03, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#3ab54a' , icon: require('../../assets/icons/checks.png')},
    { time: '12:00', title: 'Journal - October 21, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#3ab54a' , icon: require('../../assets/icons/checks.png') },
    { time: '14:00', title: 'Certified - October 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080' },
    { time: '16:30', title: 'Check Issued - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'}
  ];

  return (
    <ScrollView >
      <View style={{ padding: 15 }}><Text style={{ ...FONTS.h4 }}>TEV STATUS </Text></View>
      <Timeline
        circleSize={20}
        circleColor='rgb(20,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{ minWidth: 52 }}
        timeStyle={{ textAlign: 'center', backgroundColor: COLORS.purpleLiquid, color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: 'gray' }}
        options={{
          style: { padding: 10 }
        }}
        isUsingFlatlist={true}
        data={datas}
        innerCircle={'icon'}
        
      />
    </ScrollView>

  );
};
export default TextQ;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

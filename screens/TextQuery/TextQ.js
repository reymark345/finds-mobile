import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Timeline from 'react-native-timeline-flatlist'
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../../constants';



const TextQ = ({ navigation }) => {

  const datas = [
    { time: '09:00', title: 'Date filed - September 01, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#3ab54a', circleColor: '#3ab54a' , icon: require('../../assets/icons/checks.png') },
    { time: '10:45', title: 'Receive by Immediate Supervisor (thru name of staff) - October 03, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#3ab54a' , icon: require('../../assets/icons/checks.png')},
    { time: '19:00', title: 'Receive by RPC/Division Chief thru name of staff) - October 21, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#3ab54a' , icon: require('../../assets/icons/checks.png') },
    { time: '10:00', title: 'Receive by ARDO/ARDA (thru name) - October 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080' },
    { time: '11:30', title: 'Received by Accounting Staff (thru name) - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '12:30', title: 'On-going Documentation Review/Documentation Review In-Progress - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '14:30', title: 'Received by Budget Section for Earmarking - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '02:30', title: 'Received by Accounting Staff - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '03:30', title: 'Payroll creation - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '09:30', title: 'Received by Budget Section - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '11:30', title: 'Obligate - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '11:30', title: 'Journal - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '11:30', title: 'Certified - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'},
    { time: '12:30', title: 'Check issued - November 22, 2022', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#808080', circleColor: '#808080'}
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

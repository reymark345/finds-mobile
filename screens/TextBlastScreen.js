import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Timeline from 'react-native-timeline-flatlist'



const TextBlastScreen = ({ navigation }) => {

  const datas = [
    { time: '09:00', title: 'Incoming', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', lineColor: '#009688' },
    { time: '10:45', title: 'Obligate', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details', circleColor: '#009688' },
    { time: '12:00', title: 'Journal', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details' },
    { time: '14:00', title: 'Certified', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details' },
    { time: '16:30', title: 'Check Issued', description: 'Details details details details Details details details details Details details details details Details details details details Details details details details' }
  ];

  return (
    <ScrollView padding="5%">
      <View><Text>TEV STATUS</Text></View>

      <Timeline
        circleSize={20}
        circleColor='rgb(20,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: 'gray' }}
        options={{
          style: { paddingTop: 5 }
        }}
        isUsingFlatlist={true}
        data={datas}
        innerCircle={'dot'}
      />
    </ScrollView>

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

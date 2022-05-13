import React, { Component, Fragment, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { HeaderBar, TevLabel, TextButton, TransactionHistory } from "../components"
import { COLORS, SIZES, FONTS } from '../constants';

const QrScan = ({ navigation }) => {
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const desccription = 'Financially Integrated Dynamic System'
  const [selectedTev, setSelectedTev] = React.useState(null)


  function renderData() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow
        }}
      >
        {(scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            onRead={onSuccess}
            cameraContainerStyle={{ width: 275, borderWidth: 1, borderColor: 'white', alignSelf: 'center', }} cameraStyle={{ width: '97%', alignSelf: 'center', }}
            // cameraStyle={[{ height: 300 }]}
            // topContent={
            //   <Text style={styles.centerText}>
            //     Scan a QR Code</Text>
            // }
            bottomContent={
              <View style={{
                padding: SIZES.padding,
                alignItems: "center",
                justifyContent: "center"
              }}>
              </View>
            }
          />))

          || (
            <View >
              <Image
                source={require('../assets/images/qrcode_logo.png')}
                style={{ padding: 30, height: 350, width: 300 }}
              />
            </View>
          )}
        {ScanResult &&
          <Fragment>
            <Text style={styles.textTitle1}>Result !</Text>
            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
              <Text>Type : {result.type}</Text>
              <Text>Result : {result.data}</Text>
              <Text numberOfLines={1}>RawData: {result.rawData}</Text>
              <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
                <Text style={styles.buttonTextStyle}>Retry</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        }
        {(scan && (
          <View>
            <TextButton
              style={{
                alignItems: 'center',
              }}
              height={50}
              label="STOP SCAN"
              onPress={onStop} />
          </View>)) || (
            <View>
              <TextButton
                style={{
                  alignItems: 'center',
                }}
                height={50}
                label="SCAN QR Code"
                onPress={() => setScan(true)} />
            </View>
          )}

      </View>


    )
  }

  onStop = () => {
    setScan(false);

  }

  onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);

    setResult(e);
    setScan(false);
    setScanResult(true);
    if (check === 'http') {
      //this comment will go directly to the link if the qr is Link
      // Linking
      //   .openURL(e.data)
      //   .catch(err => console.error('An error occured', err));
    } else {
      setResult(e);
      // setScan(false);
      // setScanResult(true);
    }
  }

  activeQR = () => {
    setScan(true);
    console.log("avasfaaa");
  }

  scanAgain = () => {
    setScan(true);
    setScanResult(false);

    console.log("Pressed");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar
        right={false}

      />
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          {renderData()}

        </View>


      </ScrollView>
    </SafeAreaView>
    // <View style={styles.scrollViewStyle}>
    //   <Fragment>
    //     <StatusBar barStyle="dark-content" />
    //     <Text style={styles.textTitle}>FINDS</Text>
    //     {!scan && !ScanResult &&
    //       <View style={styles.cardView} >
    //         <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>
    //         <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
    //           <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
    //         </TouchableOpacity>

    //       </View>
    //     }

    //     {ScanResult &&
    //       <Fragment>
    //         <Text style={styles.textTitle1}>Result !</Text>
    //         <View style={ScanResult ? styles.scanCardView : styles.cardView}>
    //           <Text>Type : {result.type}</Text>
    //           <Text>Result : {result.data}</Text>
    //           <Text numberOfLines={1}>RawData: {result.rawData}</Text>
    //           <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
    //             <Text style={styles.buttonTextStyle}>Retry</Text>
    //           </TouchableOpacity>

    //         </View>
    //       </Fragment>
    //     }
    //     {scan &&
    //       <QRCodeScanner
    //         reactivate={true}
    //         showMarker={true}
    //         ref={(node) => { scanner = node }}
    //         onRead={onSuccess}
    //         topContent={
    //           <Text style={styles.centerText}>
    //             Scan a QR Code</Text>
    //         }
    //         bottomContent={
    //           <View>
    //             <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
    //               <Text style={styles.buttonTextStyle}>Stop Scan</Text>
    //             </TouchableOpacity>
    //           </View>

    //         }
    //       />
    //     }
    //   </Fragment>
    // </View>
  );
}


export default QrScan;
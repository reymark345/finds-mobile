import React, { Component, Fragment, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../scanStyle'
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';

import { HeaderBar, TextButton } from "../../components"
import { COLORS, SIZES } from '../../constants';

const QrScan = () => {
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);

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
        {scan &&
          <View>
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              onRead={onSuccess}
              cameraContainerStyle={{ width: 275, borderWidth: 1, borderColor: 'white', alignSelf: 'center', }} cameraStyle={{ width: '97%', alignSelf: 'center', }}
              bottomContent={
                <View style={{
                  padding: SIZES.padding,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                </View>
              }
            />
            <View>
              <TextButton
                style={{
                  alignItems: 'center',
                }}
                height={50}
                label="STOP SCAN"
                onPress={onStop} />
            </View>
          </View>
        }
        {ScanResult &&
          <View>
            <Text style={styles.textTitle1}>Result !</Text>
            <Text>Type : {result.type}</Text>
            <Text>Result : {result.data}</Text>
            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
            <View style={{ marginTop: 20 }}>
              <TextButton
                style={{
                  alignItems: 'center',
                }}
                height={50}
                label="RETRY"
                onPress={scanAgain} />
            </View>
          </View>
        }
        {!scan && !ScanResult &&
          <View>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/images/qrcode_logo.png')}
                style={{ padding: 30, height: 350, width: 300 }}
              />
            </View>
            <View>
              <TextButton
                style={{
                  alignItems: 'center',
                }}
                height={50}
                width={100}
                label="Scan QR Code"
                onPress={() => setScan(true)} />
            </View>
          </View>
        }
      </View>
    )
  }

  onStop = () => {
    setScan(false);
    setScanResult(false);

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
  );
}
export default QrScan;
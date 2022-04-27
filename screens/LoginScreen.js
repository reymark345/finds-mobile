import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  LogBox,
  Alert
} from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { AuthContext } from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from '../constants';
import TouchID from 'react-native-touch-id';
import NetInfo from "@react-native-community/netinfo";
import {
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import PINCode, {
  hasUserSetPinCode,
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from "@haskkor/react-native-pincode";
import { Icon } from 'style-components';



const LoginScreen = ({ navigation }) => {
  const { googleLogin } = useContext(AuthContext);
  const [state, setState] = useState({ username: '' });
  const [fingerprint, setFprint] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [internetCon, setNet] = useState(true);
  const [PinCodeVisible, setPin] = useState({ PINCodeStatus: "choose", showPinLock: false });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native.']);
    LogBox.ignoreLogs(['react-native-gesture-handler']);
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
    checkInternetConnection();
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'TouchID') {
          setFprint(true);
          // AsyncStorage.setItem('FingerprintAvailable', true);
          AsyncStorage.setItem('FingerprintAvailable', JSON.stringify(true))

        } else if (biometryType === 'FaceID') {
          console.log("supported by IOS ");
        } else if (biometryType === true) {
          setFprint(true);
          // AsyncStorage.setItem('FingerprintAvailable', true);
          AsyncStorage.setItem('FingerprintAvailable', JSON.stringify(true))
          console.log("supported by Android");
        }
        else {
          setFprint(false);
          console.log("Not supported");
        }
      })
      .catch(error => {
        console.log(error);
        console.log("Please enable your Fingerprint/touchID to your device");
      });
    AsyncStorage.getItem('userPrivilege').then((variable) => {
      if (variable != null) {
        console.log("TESTING______");
        console.log(variable);
        setState({ username: variable })
      }
    });
    fetchPosts();
  }, [])

  /* PinCode */

  function _showChoosePinLock() {
    console.log("Alert should pop upaaa");
    setPin({ PINCodeStatus: "choose", showPinLock: true });
  };


  async function _finishProcess() {
    console.log("Alert should pop upaaa");
    googleLogin();
  };

  async function _showEnterPinLock() {
    console.log("_showEnterPinLock");
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {
      console.log("_showEnterPinLock1");
      setPin({ PINCodeStatus: "enter", showPinLock: true });
    } else {
      console.log("_showEnterPinLock2");
      Alert.alert(null, "You have not set your pin.", [
        {
          title: "Ok",
          onPress: () => {
            // do nothing
          },
        },
      ]);
    }
  };
  async function _clearPin() {
    await deleteUserPinCode();
    await resetPinCodeInternalStates();
    Alert.alert(null, "You have cleared your pin.", [
      {
        title: "Ok",
        onPress: () => {
          // do nothing
        },
      },
    ]);
  };


  /* End of PinCode module  */


  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  function biometric() {
    TouchID.authenticate('Fingerprint') // Show the Touch ID prompt
      .then(success => {
        console.log(success.message);
        console.log("success");
        // Touch ID authentication was successful!
        // Handle the successs case now
      })
      .catch(error => {
        console.log("error");
        console.log(error.message);
        // Touch ID Authentication failed (or there was an error)!
        // Also triggered if the user cancels the Touch ID prompt
        // On iOS and some Android versions, `error.message` will tell you what went wrong
      });
  }
  function checkInternetConnection() {
    NetInfo.addEventListener(state => {
      if (state.isConnected == false) {
        setModalVisible(true);
        setNet(false);
        console.log("Connection types", state.type);
        console.log("Your device appears to have no internet connectivity. Please check your connection settings and try again");
      }
      else {
        console.log("Connected to internet?", state.isConnected);
      }
    });
  }
  return (
    <ScrollView style={styles.container} >
      {PinCodeVisible.showPinLock === true ? (
        <ScrollView style={styles.Pincontainer} >
          <PINCode
            status={PinCodeVisible.PINCodeStatus}
            touchIDDisabled={true}
            finishProcess={() => _finishProcess()}
            timeLocked={5000}

          />
        </ScrollView>
      ) :
        <ImageBackground source={require('../assets/images/login/login-background.png')} style={styles.backgroundImage}   >
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/images/login/finds-logo.png')} style={styles.LogoImageStyle}></Image>
          </View>


          <Text style={{ ...FONTS.h3, color: COLORS.white }}>{state?.username}</Text>
          {Platform.OS === 'android' ? (
            <View style={{ marginTop: `30%`, alignItems: 'center' }}>
              <GoogleSigninButton
                style={{ width: 252, height: 58 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => {
                  googleLogin();
                  // const hasPin = await hasUserSetPinCode();
                  // if (fingerprint === true) {
                  //   googleLogin();
                  // }
                  // else if (!hasPin) {
                  //   console.log("No pin");
                  //   _showChoosePinLock();
                  // }
                  // else if (hasPin && fingerprint === false) {
                  //   googleLogin();
                  //   // _showEnterPinLock();
                  // }
                  // else {
                  //   console.log("fingerprintt function");
                  //   // _showEnterPinLock();

                  // }
                }
                }
              />
              <CustomAlert
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={'Message'}
                message={'Please enable your Touch ID/PIN in your device'}
                buttons={[{
                  text: 'Ok',
                  func: () => { console.log('Yes Pressed') }
                }]}
              />
            </View>
          ) : null}
          {fingerprint === true ?
            <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.5} onPress={biometric}>
              <Image
                source={require('../assets/fingerprint/f-icon.png')}
                style={styles.ImageIconStyle}
              />
            </TouchableOpacity>
            :
            <View>
              <CustomAlert
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={'Message'}
                message={'Please enable your Touch ID/PIN in your device'}
                buttons={[{
                  text: 'Ok',
                  func: () => { console.log('Yes Pressed') }
                }]}
              />
              <View>
                <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.5} onPress={() => setModalVisible(true)}>
                  <Image
                    source={require('../assets/fingerprint/f-icon-gray.png')}
                    style={styles.ImageIconStyle}
                  />
                </TouchableOpacity>
              </View>
              {/* <View>
                <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.5} onPress={() => _clearPin()}>
                  <Image
                    source={require('../assets/fingerprint/f-icon-gray.png')}
                    style={styles.ImageIconStyle}
                  />
                </TouchableOpacity>
              </View> */}
            </View>
          }
          {internetCon === false ?
            <CustomAlert
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              title={'Message'}
              message={'Your device appears to have no internet connectivity. Please check your connection settings and try again'}
              buttons={[{
                text: 'Retry',
                func: () => { checkInternetConnection(); }
              }]}
            />
            : null}
        </ImageBackground>
      }
    </ScrollView>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  Pincontainer: {
    flex: 1,
    paddingTop: `50%`,
    flexDirection: 'column',
    backgroundColor: "#F5FCFF",
  },
  logoImage: {
    flex: 1,
    width: null,
    height: null,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: 758,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  LogoImageStyle: {
    padding: 10,
    margin: 5,
    height: 265,
    width: 240,
    marginTop: 80,
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 45,
    width: 50,
    marginTop: 20,
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22
  // },
});

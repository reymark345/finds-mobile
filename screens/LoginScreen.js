import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  LogBox,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { AuthContext } from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from '../constants';
import TouchID from 'react-native-touch-id';
import NetInfo from "@react-native-community/netinfo";
import SkeletonViews from '../components/SkeletonViews';
import {
  GoogleSigninButton,
} from '@react-native-community/google-signin';

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

        if (biometryType === true || biometryType === 'TouchID') {
          setFprint(true);
          AsyncStorage.setItem('FingerprintAvailable', JSON.stringify(true))
          console.log("supported by Android1111111111111111");
        }
        else if (biometryType === 'FaceID') {
          console.log("supported by IOS ");
        }
        else {
          setFprint(false);
          console.log("Not supported33333333333333");
          console.log(biometryType);
        }

      })
      .catch(error => {
        console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
  // Show the Touch ID prompt
  function biometric() {
    TouchID.authenticate('Fingerprint')
      .then(success => {
        console.log(success.message);
        console.log("success");
      })
      .catch(error => {
        console.log("error");
        console.log(error.message);
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
      <ImageBackground source={require('../assets/images/login/login-background.png')} style={styles.backgroundImage}   >
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/images/login/finds-logo.png')} style={styles.LogoImageStyle}></Image>
        </View>
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{state?.username}</Text>
        <View style={{ marginTop: `30%`, alignItems: 'center' }}>
          <GoogleSigninButton
            style={{ width: 252, height: 58 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
              googleLogin();
            }}
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
          </View>
        }
      </ImageBackground>
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
    height: 200,
    width: 200,
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

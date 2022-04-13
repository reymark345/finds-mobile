import React, {useState} from 'react';
import {View,Text, StyleSheet,Modal,TouchableOpacity} from 'react-native';

const CustomAlert = ({message,title,modalVisible,setModalVisible, buttons}) => {
  const [androidDefaults, setAndroidDefaults] = useState({
    container: {
      backgroundColor: '#FAFAFA',
    },
    title: {
      color: '#000000',
      fontFamily:'initial',
      fontSize: 22,
      fontWeight: 'bold',
    },
    message: {
      color: '#000000',
      fontFamily:'initial',
      fontSize:15,
      fontWeight:'normal',
    },
    button: {
      color: '#387ef5',
      fontFamily: 'initial',
      fontSize: 16,
      fontWeight: '500',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
  });
  
  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
    const buttonProps = buttons && buttons.length > 0 ? buttons : [{}]
  
    return (
      <View style={[styles.androidButtonGroup, {
        flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
      }]} onLayout={(e) => {
        if(e.nativeEvent.layout.height > 60)
          setButtonLayoutHorizontal(0);
      }}>
        {
          buttonProps.map((item, index) => {
              if(index > 2) return null;
              const alignSelfProperty = buttonProps.length > 2 && index === 0 && buttonLayoutHorizontal === 1 ?  'flex-start' : 'flex-end';
              let defaultButtonText = 'OK'
              if(buttonProps.length > 2){
                if(index === 0)
                  defaultButtonText = 'ASK ME LATER'
                else if(index === 1)
                  defaultButtonText = 'CANCEL';
              } else if (buttonProps.length === 2 && index === 0)
                defaultButtonText = 'CANCEL';
              return (
                <View style={[styles.androidButton, index === 0 && buttonLayoutHorizontal === 1 ? {flex: 1} : {}]}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(false)
                    if(item.func && typeof(item.func) === 'function')
                      item.func();
                  }} style={[{
                    alignSelf: alignSelfProperty, 
  
                  }]}>
                    <View style={[styles.androidButtonInner, {backgroundColor: (item.styles && item.styles.backgroundColor) || androidDefaults.button.backgroundColor}]}>
                      <Text
                        style={{
                          color: (item.styles && item.styles.color) || androidDefaults.button.color,
                          fontFamily: (item.styles && item.styles.fontFamily) || androidDefaults.button.fontFamily,
                          fontSize: (item.styles && item.styles.fontSize) || androidDefaults.button.fontSize,
                          fontWeight: (item.styles && item.styles.fontWeight) || androidDefaults.button.fontWeight,
                          textTransform: (item.styles && item.styles.textTransform) || androidDefaults.button.textTransform,
                        }}
                      >{item.text || defaultButtonText}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
  
        }
      </View>
    );
  }
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => setModalVisible(false)} />
        <View style={styles.alertBox}>
        {
          Platform.OS === "ios" ? 
          null
          :
          <View style={[styles.androidAlertBox, androidDefaults.container]}>
            <Text style={[styles.androidTitle, androidDefaults.title]}>{title || 'Message'}</Text>
            <Text style={[styles.androidMessage, androidDefaults.message]}>{message || ''}</Text>
            <AndroidButtonBox />
          </View>
        }
        </View>
      </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  LogoImageStyle:{
    padding: 10,
    margin: 5,
    height: 265,
    width: 240,
    marginTop:80,
    alignItems:'center',
    resizeMode: 'stretch',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 45,
    width: 50,
    marginTop:-100,
    alignItems:'center',
    resizeMode: 'stretch',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.4
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAlertBox: {
    maxWidth: 280,
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 2,
  },
  androidTitle: {
    margin: 24,
  },
  androidMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,    
  },
  androidButtonInner: {
    padding: 10,

  }
});

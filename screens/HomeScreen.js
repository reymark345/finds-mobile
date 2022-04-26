import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';

import { PriceAlert, TransactionHistory } from "../components"
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';
import PINCode, {
    hasUserSetPinCode,
    resetPinCodeInternalStates,
    deleteUserPinCode,
} from "@haskkor/react-native-pincode";

const HomeScreen = ({ navigation }) => {

    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = React.useState(dummyData.transactionHistory)
    const [fingerprint, setFprint] = useState(false);
    // const [PinCodeVisible, setPin] = useState({ PINCodeStatus: "choose", showPinLock: false });
    const [pinCodeVisible, setPin] = useState({ PINCodeStatus: "choose", showPinLock: true });

    React.useEffect(() => {
        LogBox.ignoreLogs(['Found screens with the same name nested'])
        LogBox.ignoreLogs(['Bottom Tab Navigator:'])
        LogBox.ignoreLogs(['[react-native-gesture-handler]'])
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        LogBox.ignoreLogs(['source.uri should not be an empty string'])
        LogBox.ignoreLogs(['Can\'t perform a React state update '])
        LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native.'])
        pinCode();

        TouchID.isSupported()
            .then(biometryType => {
                if (biometryType === 'TouchID' || biometryType === true) {
                    setFprint(true);
                    // AsyncStorage.setItem('FingerprintAvailable', true);
                    AsyncStorage.setItem('FingerprintAvailable', JSON.stringify(true))
                }
            })
            .catch(error => {
                console.log(error);
                console.log("Please enable your Fingerprint/touchID to your device");
            });

    }, [])


    /* PinCode */

    async function pinCode() {
        const hasPin = await hasUserSetPinCode();
        console.log("----------------------------------------------------------ok");
        console.log(hasUserSetPinCode);


        if (fingerprint === true) {
            console.log("No pin11111111111111111111");
            // setPin({ showPinLock: false });
            setPin({ ...pinCodeVisible, showPinLock: false });
        }

        else if (!hasPin) {
            console.log("No pin2222222222222");
            _showChoosePinLock();
        }
        else if (hasPin) {

            console.log("has pinn3333333333333");
            // _showEnterPinLock();
            // setPin({ ...pinCodeVisible, showPinLock: true });
            // PINCodeStatus: "choose"

            setPin({ PINCodeStatus: "enter", showPinLock: true });

        }
        else {
            console.log("does not have pin");
            _showChoosePinLock();

        }
    }
    function _showChoosePinLock() {
        console.log("Alert should pop upaaa");
        setPin({ PINCodeStatus: "choose", showPinLock: true });
    };

    async function _finishProcess() {
        console.log("Alert should pop upaaa");
        setPin({ showPinLock: false });
        // if (PinCodeVisible.PINCodeStatus === "enter") {
        //   console.log(PinCodeVisible.PINCodeStatus);
        //   console.log("Enterssss");
        //   googleLogin();

        // }
        // else {
        //   console.log(PinCodeVisible.PINCodeStatus);
        //   console.log("Choose");
        //   setPin({ showPinLock: false });
        // }
    };

    async function _showEnterPinLock() {
        setPin({ PINCodeStatus: "enter", showPinLock: true });

        // console.log("_showEnterPinLock");
        // const hasPin = await hasUserSetPinCode();
        // if (hasPin) {
        //     console.log("_showEnterPinLock1");
        //     setPin({ PINCodeStatus: "enter", showPinLock: true });
        // } else {
        //     console.log("_showEnterPinLock2");
        //     Alert.alert(null, "You have not set your pin.", [
        //         {
        //             title: "Ok",
        //             onPress: () => {
        //                 // do nothing
        //             },
        //         },
        //     ]);
        // }
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




    function renderHeader() {

        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                style={{
                    width: 155,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: COLORS.white

                }}
                // onPress={() => navigation.navigate("nextScreen")}
                onPress={() => navigation.navigate("tev", { tev: item })}
            >
                {/* Currency*/}
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image
                            source={item.image}
                            resizeMode="cover"
                            style={{
                                marginTop: 5,
                                width: 25,
                                height: 25
                            }}
                        />
                    </View>
                    <View style={{ marginLeft: SIZES.base }}>
                        <Text style={{ ...FONTS.h3, color: '#666', fontWeight: 'bold' }}>{item.currency}</Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.body3 }}></Text>
                    </View>
                </View>
                {/* value*/}
                {/* <View style={{ marginTop:SIZES.radius}}> */}
                {/* <Text style={{...FONTS.h6}}>₱{item.amount}</Text> */}
                {/* <Text style={{color: item.type =="I" ? COLORS.green : COLORS.red, ...FONTS.h5}}>₱{item.amount}</Text> */}

                {/* </View> */}
            </TouchableOpacity>

        )
        return (
            <View
                style={{
                    width: "100%",
                    height: 210,
                    ...styles.shadow
                }}
            >
                <ImageBackground
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    {/* Header Bar */}
                    <View
                        style={{
                            marginTop: SIZES.padding * 1,
                            width: "100%",
                            alignItems: "flex-end",
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <TouchableOpacity

                            style={{
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                justifyContent: "center"
                            }}

                            onPress={() => console.log("Notification on pressed")}
                        >
                            <Image
                                source={icons.notification_white}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* Balance */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Available Balance</Text>
                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h2 }}>₱{dummyData.portfolio.balance}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body5 }}>{dummyData.portfolio.changes} Last 24 hours</Text>
                    </View>
                    {/* Trending */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: "-30%"
                        }}
                    >
                        <Text style={{
                            marginLeft: SIZES.padding,
                            color: COLORS.white, ...FONTS.h3
                        }}>Dashboard</Text>
                        <FlatList
                            contentContainerStyle={{ marginTop: SIZES.base }}
                            data={trending}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />

                    </View>
                </ImageBackground>
            </View>
        )
    }
    function renderAlert() {
        return (
            <PriceAlert />
        )
    }
    function renderNotice() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding - 6,
                    marginHorizontal: SIZES.padding,
                    padding: 12,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.secondary,
                    ...styles.shadow,

                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Announcement:</Text>
                <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18 }}>We offer you an application to guide and track your data.
                    Learn how to use this application by reading instructions and guide.
                </Text>

                <TouchableOpacity
                    style={{
                        marginTop: SIZES.base
                    }}
                    onPress={() => navigation.navigate("textblast")}
                >
                    <Text style={{
                        textDecorationLine: 'underline',
                        color: COLORS.green, ...FONTS.h4
                    }}>Learn more
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderTransactionHistory() {
        return (
            <TransactionHistory
                customContainerStyle={{ ...styles.shadow }}
                history={transactionHistory}

            />
        )
    }
    return (
        <View style={styles.container}>
            {(pinCodeVisible.showPinLock && (
                <PINCode
                    finishProcess={() => _finishProcess()}
                    status={pinCodeVisible.PINCodeStatus}
                    timeLocked={12000}
                    touchIDDisabled={true}
                />
            )) || (
                    <ScrollView style={styles.container}>
                        {renderHeader()}
                        {renderAlert()}
                        {renderNotice()}
                        {renderTransactionHistory()}
                    </ScrollView>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    Pincontainer: {
        flex: 1,
        paddingTop: `40%`,
        flexDirection: 'column',
        backgroundColor: "#F5FCFF",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default HomeScreen;;
import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { PriceAlert, TransactionHistory } from "../components"
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';
import PINCode, {
    hasUserSetPinCode,
} from "@haskkor/react-native-pincode";

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = React.useState(dummyData.transactionHistory)
    const [fingerprint, setFprint] = useState(false);
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

    async function pinCode() {
        const hasPin = await hasUserSetPinCode();
        console.log("----------------------------------------------------------ok");
        console.log(hasUserSetPinCode);
        if (fingerprint === true) {
            setPin({ ...pinCodeVisible, showPinLock: false });
        }

        else if (!hasPin) {
            setPin({ PINCodeStatus: "choose", showPinLock: true });
        }
        else if (hasPin) {
            setPin({ PINCodeStatus: "enter", showPinLock: true });
        }
        else {
            setPin({ PINCodeStatus: "choose", showPinLock: true });
        }
    }

    async function _finishProcess() {
        console.log("Alert should pop upaaa");
        setPin({ showPinLock: false });
    };

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

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                },
            ],
            { cancelable: false },
        );
    };

    const deletePost = (postId) => {
        console.log('Current Post Id: ', postId);

        firestore()
            .collection('posts')
            .doc(postId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();

                    if (postImg != null) {
                        const storageRef = storage().refFromURL(postImg);
                        const imageRef = storage().ref(storageRef.fullPath);

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted successfully.`);
                                deleteFirestoreData(postId);
                            })
                            .catch((e) => {
                                console.log('Error while deleting the image. ', e);
                            });
                        // If the post image is not available
                    } else {
                        deleteFirestoreData(postId);
                    }
                }
            });
    };

    const deleteFirestoreData = (postId) => {
        firestore()
            .collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                Alert.alert(
                    'Post deleted!',
                    'Your post has been deleted successfully!',
                );
                setDeleted(true);
            })
            .catch((e) => console.log('Error deleting posst.', e));
    };

    const ListHeader = () => {
        return null;
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
                <ScrollView
                    style={{ flex: 1, marginTop: `10%` }}
                    contentContainerStyle={{ alignItems: 'center' }}>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
                            />
                            <View
                                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
                            />
                        </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
                            />
                            <View
                                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
                            />
                        </View>
                    </SkeletonPlaceholder>
                </ScrollView>
            ) : (
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

                // <Container>
                //     <FlatList
                //         data={posts}
                //         renderItem={({ item }) => (
                //             <PostCard
                //                 item={item}
                //                 onDelete={handleDelete}
                //                 onPress={() =>
                //                     navigation.navigate('HomeProfile', { userId: item.userId })
                //                 }
                //             />
                //         )}
                //         keyExtractor={(item) => item.id}
                //         ListHeaderComponent={ListHeader}
                //         ListFooterComponent={ListHeader}
                //         showsVerticalScrollIndicator={false}
                //     />
                // </Container>
            )}
        </SafeAreaView>
    );
};

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

export default HomeScreen;

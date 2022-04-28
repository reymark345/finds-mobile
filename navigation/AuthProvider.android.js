import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import SkeletonViews from '../components/SkeletonViews';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleLogin: async () => {

          <SkeletonViews />


          // loading ? (
          //   <SkeletonViews />
          // ) : () => {
          //   console.log("oksssssssssssssssssssssss");
          // }


          // }

          try {
            // Get the users ID token
            const Token = await GoogleSignin.signIn();
            const { idToken } = Token;
            console.log("Processing");
            console.log("ok");

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);


            console.log("test");
            console.log(Token.user.name);
            console.log(Token.user.photo);
            console.log(Token.user.email);
            console.log("Oh naa");

            AsyncStorage.setItem('userPrivilege', Token.user.name);
            AsyncStorage.setItem('userPrivilegePhoto', Token.user.photo);
            AsyncStorage.setItem('userPrivilegeEmail', Token.user.email);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)


              // Use it only when user Sign's up, 
              // so create different social signup function
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                console.log("hallllllllllllll-------------------------------------------------------------------");
                console.log('current User', auth().currentUser);

                firestore().collection('users').doc(auth().currentUser.uid)
                  .set({
                    fname: '',
                    lname: '',
                    completename: auth().currentUser.displayName,
                    email: auth().currentUser.email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: auth().currentUser.photoURL,
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                  })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log('Something went wrong with sign up: ', error);
          }
        },


        logout: async () => {
          try {
            // signOut();
            GoogleSignin.configure({});
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({ user: null });
            AsyncStorage.setItem('userPrivilege', '');
            // AsyncStorage.setItem('userPrivilegePhoto','https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg');
            await auth().signOut();
            console.log("sa try");



          } catch (e) {
            console.log(e);
            console.log("Please contact administrator");
          }
        },
      }
      } >
      {children}
    </AuthContext.Provider >
  );
};

import React, {useState, useEffect} from 'react';
import {  StyleSheet, SafeAreaView, Text, View, StatusBar, Button, LogBox} from 'react-native';
import  firebase from "./src/utils/firebase";
import Auth from "./src/components/Auth";
import {decode, encode} from "base-64";
import ListBirthday from "./src/components/ListBirthday";
import "firebase/auth";

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

LogBox.ignoreLogs("Setting a timer");

export default function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if(user === undefined)  return null;


  return (
      <>
        <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.background}> 
        {user ? <ListBirthday user={user}/> : <Auth />} 
      </SafeAreaView>
      </>

  );
}




const styles = StyleSheet.create({

  background: {
    backgroundColor: "#cd6376",
    height: "100%",

  },


})
import React, {useState} from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


export default function Auth(){


    const [isLogin, setIsLogin] = useState(true)

    const changeForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <View style={styles.view}>
            <Image 
            style={styles.logo}
            source={require("../assets/logo.png")} />
            {isLogin ? <LoginForm  changeForm={changeForm}/> : <RegisterForm changeForm={changeForm} />}
        </View>
    );

}


const styles= StyleSheet.create({

    view: {
        flex: 1,
        alignItems: "center",
    },
    logo: {
        width: "90%",
        height: 220,
        marginTop: 40,
        marginBottom: 40,

    },

})
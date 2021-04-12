import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import {validateEmail} from "../utils/validations";
import firebase from "../utils/firebase";


export default function LoginForm (props) {

    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const login = () => {
        let errors= {};
        if(!formData.email || !formData.password ){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
            console.log("1");

        }else if(!validateEmail(formData.email)){
            errors.email=true;
            console.log("2");
        }else
        {
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email,formData.password)
            .then(() => {
                console.log("OK");

            })
            .catch(() => {
                setFormError({
                    email: true,
                    password: true,

                });
            });
        }
        setFormError(errors);

    };

    const onChange = (e, type) => {
       // console.log('data: ', e.nativeEvent.text);
       // console.log("type: ", type);
       setFormData({...formData, [type]: e.nativeEvent.text});


    };
    return (
        <>
            <TextInput 
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electrónico"
                placeholderTextColor="#fff" 
                onChange={(e) => onChange(e, "email")}
                
            />
            <TextInput 
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#fff" 
                secureTextEntry={true}
                onChange={(e) => onChange(e, "password")}
               
            />
            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
            <View style={styles.viewRegister}>
                <TouchableOpacity  onPress={changeForm}>
                    <Text style={styles.btnRegister}>Registrar</Text>
                </TouchableOpacity>

            </View>
            
        </>
    )
}

function defaultValue(){
    return {
    email: "",
    password: "",
    };
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 17,
        color: "#fff",
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 16,
        backgroundColor: "#5a506f",
        alignItems: "center",
        marginBottom: 90,
        

    },
    input: {
        height: 50,
        color: "#fff",
        width: "75%",
        marginBottom: 25,
        backgroundColor: "#de9aa6",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 0,
    
    },
    viewRegister: {
        flex: 1,
        justifyContent: "flex-end",
    },
    btnRegister: {
        fontSize: 22,
        paddingVertical: 10,
        color: "#fff",
        alignItems: "center",
    },
    error: {
        borderColor: "#e82323",
        borderWidth: 2,

    },

});

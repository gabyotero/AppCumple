import React, {useState} from 'react'

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button} from 'react-native'
import {validateEmail} from "../utils/validations";
import firebase from "../utils/firebase"
export default function RegisterForm(props) {

    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const register = () => {
        let errors= {};
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
            if(!formData.repeatPassword) errors.repeatPassword=true;

        }else if(!validateEmail(formData.email)){
            errors.email=true;

        }else if(formData.password !== formData.repeatPassword){
            errors.password=true;
            errors.repeatPassword=true;
        }else if(formData.password.length < 6){
            errors.password=true;
            errors.repeatPassword=true;

        }else{
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email,formData.password)
            .then(() => {
                console.log("cuenta creada");

            })
            .catch(() => {
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,

                });
            });
        }
        setFormError(errors);
        
    };

   
    return (
        <>
            <TextInput 
            style={[styles.input, formError.email && styles.error]}
            placeholder="Correo electrónico"
            placeholderTextColor="#fff" 
            onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
            />
            <TextInput 
            style={[styles.input, formError.password && styles.error]}
            placeholder="Contraseña"
            placeholderTextColor="#fff" 
            secureTextEntry={true}
            onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
            />
            <TextInput 
            style={[styles.input, formError.repeatPassword&& styles.error]}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#fff" 
            secureTextEntry={true}
            onChange={(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}
            />
            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>REGISTRAR</Text>
            </TouchableOpacity>
            
            <View style={styles.viewLogin}>
            <TouchableOpacity  onPress={changeForm}>
                <Text style={styles.btnLogin}>Iniciar sesión</Text>
            </TouchableOpacity>
            </View>
            
            
        </>
    )
}

function defaultValue(){
    return {
    email: "",
    password: "",
    repeatPassword: "",
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
    viewLogin: {
        flex: 1,
        justifyContent: "flex-end",
    },
    btnLogin: {
        fontSize: 22,
        paddingVertical: 10,
        color: "#fff",
        alignItems: "center",
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
    error: {
        borderColor: "#e82323",
        borderWidth: 2,

    },



});

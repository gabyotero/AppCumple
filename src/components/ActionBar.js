import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from "../utils/firebase"

export default function ActionBar(props) {
    console.log(props);
    const {showList, setShowList} = props;

    
    return (
        <View style={styles.viewFooter}>
            <View style={styles.viewClose}>
                <Text style={styles.text}onPress={() => firebase.auth().signOut()} >
                    Cerrar sesión
                </Text>
            </View>
            <View style={styles.newAdd}>
                <Text style={styles.text} onPress={() => setShowList(!showList)}>
                    {showList ? "Nueva fecha" : "Cancelar fecha"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        marginBottom: 10,


    },
    viewClose: {
        backgroundColor: "#876b9f",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignContent: "center",
        marginBottom: 10,
    },
    
    newAdd: {
        backgroundColor: "#499e7e",
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignContent: "center",
        marginBottom: 10,

    },
    text: {
        fontSize: 17,
        color: "#fff",
        textAlign: "center",
    },


});

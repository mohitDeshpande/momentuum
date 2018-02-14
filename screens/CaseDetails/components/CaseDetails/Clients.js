import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Clients extends React.Component {
    render() {
        return(
            <View style={styles.container}>
            <View style={{flex:1}}>
            <Text style={styles.category}>Client Details</Text>
            </View>
                <View style={styles.clientcontainer}>
                    <View style={styles.row}>
                        <Text style={styles.title}>Tailor Haffman</Text><Text>#345543232</Text>
                    </View>
                    <Text style={styles.text}>85 Thorncliffe Park Drive</Text>
                    <View style={styles.row}>
                    <Text>437 777 6783</Text><Text>xyz@gmail.com</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    clientcontainer: {
        bottom:10
    },
    row: {
        flexDirection:'row',
        justifyContent: 'space-around',
    },
    text: {
      left:45
    },
    title: {
        fontSize: 18,
        color: '#050B7A'
    },
    category: {
      fontSize: 16,
      color: '#444',
      fontWeight: '500',
      bottom:15,
      left:10,
    }
})

export default Clients
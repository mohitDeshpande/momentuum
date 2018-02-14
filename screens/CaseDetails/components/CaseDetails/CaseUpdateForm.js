import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getData } from '../../utils/api'
import { Font } from 'expo';
import DatePicker from 'react-native-datepicker'

class CaseUpdateForm extends React.Component {

    render() {
        const datas = getData()

        return (   
                <View style={styles.formcontainer}>
                    {Object.keys(datas).map((data) => {
                        const{id} = datas[data]
                        return (
                            <Text>{id}</Text>
                        )
                    })}
                     <Text>Case Update Form</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default CaseUpdateForm
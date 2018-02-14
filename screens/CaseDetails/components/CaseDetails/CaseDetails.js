import React from 'react';
import { Text, ScrollView, View, TextInput, StatusBar } from 'react-native';
import { Constants } from 'expo';
import Clients from "./Clients";
import styles from "../../styles/CaseDetailsStyles"
import DatePickerIOS from 'react-native-datepicker' // 1.6.0
import { Dropdown } from 'react-native-material-dropdown'; // 0.7.2
import { Sae } from 'react-native-textinput-effects'; // 0.4.2
import { Hoshi } from 'react-native-textinput-effects'; // 0.4.2
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // 4.5.0

class CaseDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate })
    }

    //TextInput fields effects
    render() {
        const caseCodeInput = (
            <Sae
                label={'Case Code'}
                inputStyle={{ color: '#000' }}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'gray'}
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
            />
        );
        const hoshiInput = (
            <Hoshi
                label={'Case Code'}
                // this is used as active border color
                borderColor={'#fff'}
                paddingHorizontal={0}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={'#fff'}
            />
        );

        //Dropdown text field dummy data
        let casestatus = [{
            value: 'Open',
        }, {
            value: 'Closed',
        }, {
            value: 'Pending',
        }];

        let casetype = [{
            value: 'Assistance',
        }, {
            value: 'Forward',
        }, {
            value: 'Xyz',
        }];

        //Main case details View
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ paddingTop: 65 + 30 }}
                    style={{ flex: 1, backgroundColor: '#F8F8F9' }}>

                    //clients component
                    <Clients />

                    //Case details form
                    <View style={{ flex: 1 }}>
                        <Text style={styles.category}>Case Update From</Text>
                    </View>
                    <View style={[styles.row, styles.firstRow]}>
                        <DatePickerIOS
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0,
                                },
                                dateInput: {
                                    //alignItems:'left',
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderTopWidth: 0,
                                }
                            }}
                            date={this.state.chosenDate}
                            onDateChange={this.setDate}
                            style={styles.date}
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            placeholder="Case Code"
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.row}>
                        <Dropdown
                            style={styles.dropdown}
                            textColor='rgb(0, 0, 0)'
                            label='Case Type'
                            data={casetype}
                        />
                    </View>
                    <View style={styles.row}>
                        <Dropdown
                            style={styles.dropdown}
                            label='Case Status'
                            data={casestatus}
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            multiline={true}
                            placeholder="Description"
                            style={styles.description}
                        />
                    </View>
                </ScrollView>
                <View style={styles.navbar}>
                    <Text style={styles.titleText}>Case Details</Text>
                </View>
                <StatusBar barStyle="light-content" />
            </View>
        )
    }
}


export default CaseDetails
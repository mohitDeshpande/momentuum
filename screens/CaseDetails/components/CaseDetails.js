import React from 'react';
import { Text, ScrollView, View, StatusBar, TouchableHighlight, AsyncStorage} from 'react-native';
import { Constants } from 'expo';
import CaseUpdateForm from "./CaseUpdateForm";
import ClientDetails from "./ClientDetails";
import CaseItems from "./CaseItems";
import styles from "../styles/CaseDetailsStyles"
import Icon from 'react-native-vector-icons/FontAwesome'; // 4.5.0
import { StackNavigator } from 'react-navigation';

class CaseDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Case Details',
        headerRight: (
            <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                <Icon name="trash" size={25} color="#fff" onPress={() => this.props.navigation.navigate('CaseUpdateForm')} />
            </View>
        ),
        headerLeft: (
            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <Icon name="angle-left" size={25} color="#fff" onPress={() => this.props.navigation.navigate('CaseUpdateForm')} />
            </View>
        ),
    };

    async componentDidMount() {
        const { params } = this.props.navigation.state;
        const caseid = params ? params.caseid1 : "null";
        console.log("Test + " + caseid);
        console.log("passcaseid");
    }

    render() {
        
        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ paddingVertical: 0 }}
                    style={{ flex: 1, backgroundColor: '#f2f2f4' }}>


                    {/* Client Session */}
                    <ClientDetails />
                    {/* Client Session Ends */}

                    {/* Case Session */}
                    <CaseUpdateForm />
                    {/* Case Session Ends */}

                    {/* Case Items Session */}
                    {/* Case Items header */}
                    <View style={styles.header}>
                        <Text style={styles.category}>Case Items</Text>
                        <Icon name="plus-square" size={25} style={{ paddingTop: 10 }} color="#444" />
                    </View>

                    {/* Case Items details */}
                    {/* ///Case Items goes here/// */}
                    {/* Case Items Session Ends */}
                </ScrollView>
                <StatusBar barStyle="light-content" />
            </View>
        )
    }
}

export default CaseDetails

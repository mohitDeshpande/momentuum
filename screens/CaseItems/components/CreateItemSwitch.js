import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/CreateItemSwitchStyles'
import routes from '../../../assets/config/RouteNames';
import color from '../../../assets/styles/color';

export default class CreateItemSwitch extends React.Component {

    static navigationOptions = {
        title: 'Create Case Item',	
        headerMode: 'screen',		
        tabBarVisible: false		
    };

    render() {
        return (
            <SafeAreaView style={styles.layout}>
                <Button 
                    title='Create Case Detail Item'
                    icon={
                        <Icon 
                            name='list-alt'
                            color={color.white}
                        />
                    }
                    buttonStyle={{
                        backgroundColor: color.primaryColor.rgb,
                        borderRadius: 5
                    }}
                    style={styles.item}
                    onPress={() => {
                        this.props.navigation.navigate(routes.createCaseItem, {CaseId:this.props.caseId})
                    }}
                />
                <Button 
                    title='Capture a Photo'
                    icon={
                        <Icon 
                            name='camera'
                            color={color.white}
                        />
                    }
                    buttonStyle={{
                        backgroundColor: color.primaryColor.rgb,
                        borderRadius: 5
                    }}
                    style={styles.item}
                    onPress={() => {
                        this.props.navigation.navigate(routes.createCaseItem, {CaseId:this.props.caseId})
                    }}
                />
            </SafeAreaView>
        );
    }
}
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
//Stylesheet
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    /* required  */
    category: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
        top: 10,
    },
    /* required  */
    header: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        color: '#444',
        fontWeight: '500',
        top: 10,
        justifyContent: 'space-between'
    },
    clientHeader: {
        paddingBottom:15
    },
    /* required */
    row: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    /* required */
    firstRow: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
    clientRow: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical:5,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    /* required */
    clientFirstRow: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical:5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    clientName: {
        color: '#2b6aa6',
        fontWeight:'500',
    },
    /* required */
    fieldname: {
        color: '#000',
        paddingTop: 10
    },
    /* required */
    textInput: {
        height: 45,
        paddingHorizontal: 20,
    },
    /* required */
    details: {
        backgroundColor: '#fff'
    },
})
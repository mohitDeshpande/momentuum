import { StyleSheet } from 'react-native';
//Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 65,
        backgroundColor: '#050B7A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    },
    titleText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '500'
    },
    category: {
        flex: 1,
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
        left: 10,
        top: 10
    },
    row: {
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    firstRow: {
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
        marginTop: 20,
        flexDirection: 'row'
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 20
    },
    dropdown: {
        flex: 1,
        paddingHorizontal: 15,
    },
    date: {
        flex: 1,
    },
    description: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 20
    },
    formcontainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height:40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20
    }
})
import { StyleSheet, Dimensions } from 'react-native';
import { windowHeight, windowWidth } from './Components/Dimensions';
const { height } = Dimensions.get('screen');
const Styles = StyleSheet.create({
    modal: {
        margin: 0
    },
    yesNoButton: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      container: {
        flex: 1
      },
      addButtonText: {
        color: '#ffffff',
        fontSize: 24,
      },
      addButton: {
        position: 'absolute',
        marginLeft: 30,
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#2e5bb6',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
      },
      detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 5
      },
      detailsText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        padding: 5,
        flex: 1
      },
      detailsTextValue: {
        padding: 5,
        flex: 1
      },
    FormText:{
        fontWeight:'bold'
    },
    formInput:{
        borderWidth: 1,
        // justifyContent:'flex-start',
        height: 50,
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 20,
      },
      saveButton: {
        width: 100,
        height: 50,
        // padding: 8,
        borderRadius: 5,
        marginVertical: 25,
        paddingVertical: 12,
        alignSelf:'center'
      },
      loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e5bb6',
        textAlign: 'center',
      },
      loginSubtitleTextStyle: {
        fontSize: 20,
        color:'#fff'
      },
      goodMorningTextStyle: {
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 2,
        color:'#fff'
      },
      logoContainer: {
        flex: 0.1,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      footer: {
        flex: 2,
        backgroundColor: '#2e5bb6',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingTop:40,
        paddingHorizontal: 20,
        // paddingVertical: 30,
      },
      signUpFormContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 1
      },
      loginContainer: {
        flexDirection: "row",
        marginTop: 10,
        borderWidth: 0.5,
        // borderColor:'#f2f2f2', 
        borderBottomColor: '#f2f2f2',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
      },
      input: {
        flex: 1,
        // marginTop:Platform.OS==="ios"? 0: -12,
        paddingLeft: 10,
        backgroundColor: 'transparent',
        color: '#ffffff',
        justifyContent: 'center'
      },
      showHideButton: {
        position: 'absolute',
        right: 0,
        padding: 15,
      },
      loginButton: {
        width: 150,
        // backgroundColor: '#fff',
        height: windowHeight / 15,
        padding: 8,
        borderRadius: 5,
        marginVertical: 25,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      signUpButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
      },
      signUpTextContent: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
      },
      signUpTextstyle: {
        color: '#fff',
        fontSize: 16,
        flexDirection: 'row',
      },
});

export default Styles;
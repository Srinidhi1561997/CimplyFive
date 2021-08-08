import React from 'react';
import { View, Text,BackHandler} from 'react-native';
import * as Constants from '../Constants';
import {connect} from 'react-redux';
import * as Actions from '../Actions/index';
import { store } from '../ConfigureStore';

class SplashScreen extends React.Component {

  constructor(props) {
    super(props);

  }


  componentWillMount() {
    
  }

  componentWillUnmount() {
    
    // this.focusListener.remove();
  }
 
  componentDidMount() {
      setTimeout(()=>{
          if(store.getState().signedReducer.signed===true){
              this.props.navigation.navigate('ButtonScreen');
          } else if(store.getState().signedReducer.signed===false){
            this.props.navigation.navigate('Login');
          }
      },1000)
  }
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center',alignItems: 'center',backgroundColor:'#2e5bb6'}}>
        <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>{Constants.WELCOME_BACK}</Text>
   </View>
    );
  }
}
 
const mapStateToProps = state => {
    let Signed;
  
    if (state.signedReducer && state.signedReducer.signed) {
        Signed = state.signedReducer.signed;
    }
    return {
        Signed,      
    };
  };
  
  export default connect(
    mapStateToProps,
    Actions,
  )(SplashScreen);

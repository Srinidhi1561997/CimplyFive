import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Styles} from '../Styles';
import {Auth} from 'aws-amplify';
import { store } from '../ConfigureStore';
import * as Actions from '../Actions';

class ButtunScreen extends Component {   
    signOut(){
        Auth.currentSession()
      .then(res => {
        if (res) {
          Auth.signOut()
            .then(res => {
            store.dispatch(Actions.logOut(undefined));
              this.props.navigation.navigate('Login');
            })
            .catch(err => {
            });
        }
      })
      .catch(err => { });
    }
  render() {
  return (
      <View style={{backgroundColor:"#fff", flex:1, justifyContent:'center'}}>
          <View style={{flexDirection:'column', alignItems:'center'}}>
              <TouchableOpacity style={{paddingHorizontal:25,
                   backgroundColor:'#2e5bb6',
                    borderRadius:5,
                    paddingVertical:15}} onPress={()=>{
                  this.props.navigation.navigate('StudentDb')
              }}>
                    <Text style={{textAlign:'center', 
                        color:'#fff'}}>StudentDb</Text>
              </TouchableOpacity>
              <View style={{padding:10}}/>
              <TouchableOpacity style={{paddingHorizontal:25,
                    backgroundColor:'#2e5bb6',
                    borderRadius:5,
                    paddingVertical:15}} onPress={()=>{
                  this.props.navigation.navigate('CourseDb')
                 }}>
                    <Text style={{textAlign:'center', 
                            color:'#fff'}}>CourseDb</Text>
              </TouchableOpacity>
              <View style={{padding:10}}/>
              <TouchableOpacity style={{paddingHorizontal:25,
                    backgroundColor:'#2e5bb6',
                    borderRadius:5,
                    paddingVertical:15}} onPress={()=>{this.signOut()}}>
                    <Text style={{textAlign:'center', 
                            color:'#fff'}}>Logout</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}
}

export default ButtunScreen;
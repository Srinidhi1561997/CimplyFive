import React, {Component} from 'react';
import {View,Text,TouchableOpacity,BackHandler} from 'react-native';
import Modal from 'react-native-modal';
import {Card} from 'react-native-paper';
import * as Constants from '../Constants';
import Styles from '../Styles';

const CloseAppMsg = (props) => {
        const { backButtonPressed, parentCallback, ...attributes } = props;
        
        return(
            <Modal
            style={[Styles.modal,
              {backgroundColor:"rgba(52, 52, 52, 0.8)",
              paddingLeft:10, paddingRight:10}]}
            animationType={'fade'}
            visible={backButtonPressed}
            transparent={true}
            onRequestClose={() => {
          
            }}>
              
            <Card
              style={{
                width: "100%",
                height: 120,
                backgroundColor: '#fff',
                shadowOffset: {width: 1, height: 1},
                shadowColor: '#333',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                padding: 10,
              }}>               
                <Text style={{fontSize:16, fontWeight:'500', color:"#000",padding:10}}>
                  {Constants.EXIT_APP}
                  </Text>        
              <View style={{flexDirection:'row', justifyContent:'space-between', padding:10}}>
              <TouchableOpacity
                onPress={() => [ BackHandler.exitApp()]} >
                <Text style={Styles.yesNoButton}>{Constants.YES}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>parentCallback("No")} >
                <Text style={Styles.yesNoButton}>{Constants.NO}</Text>
              </TouchableOpacity>
              </View>
            </Card>
          </Modal>
        )
    }

  export default CloseAppMsg;
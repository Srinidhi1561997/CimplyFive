import React from 'react';
import {View, Text,TouchableOpacity,FlatList} from 'react-native';
import { Header } from 'native-base';
import Styles from '../Styles';
import {connect} from 'react-redux'
import * as Actions from '../Actions';
import { store } from '../ConfigureStore';
import Feather from 'react-native-vector-icons/Feather';

const StudentDb = (props) =>{
    return(
        <View style={[Styles.container,{backgroundColor:'#fff'}]}>
            <View style={{backgroundColor:'#2e5bb6', flexDirection:'row'}}>
            <Feather style={{padding:20}} size={24} color='#fff' name='chevron-left' onPress={()=>props.navigation.goBack()} />
            <Text style={{textAlign:'center', color:'#fff',padding:20}}>Student list</Text>
            </View>
            <View style={{flex:1}}>
                {props.StudentList.length===0?<Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',padding:10}}>
                    No Student list is available, please click on add button to add student.
                </Text>:
                <FlatList
                    contentContainerStyle={{flex:1}}
                    scrollEnabled={true}
                    data={props.StudentList}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                return (
              <View>
                <TouchableOpacity style={{backgroundColor:index%2===0?'#e6e6ff':'#ffffff',padding:5}}
                    onPress={()=>[store.dispatch(Actions.SaveIndex(index),props.navigation.navigate('StudentDetails'))]}>
              <View style={{flexDirection:"row", padding:10}}>
              <Feather name='book' color="#000" size={18} style={{paddingRight:10}}/>
              <Text style={{textAlign:'center'}}>{item.Name}</Text>
              </View>
              </TouchableOpacity>
              <View style={{padding:2,borderBottomWidth:0.3, borderBottomColor:'#000'}}/>
              </View>
           
           )
        }}
            />}
            </View>
            <TouchableOpacity
            onPress={() => props.navigation.navigate('StudentForm')}
            style={Styles.addButton}>
            <Text style={Styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
    )
};

const mapStateToProps = state => {
    let StudentList;
  
    if (state.Student && state.Student.student) {
        StudentList = state.Student.student;
    }
    return {
        StudentList,      
    };
  };
export default connect(
    mapStateToProps,
    Actions
)(StudentDb);
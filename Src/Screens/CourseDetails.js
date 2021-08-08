import React from 'react';
import {View, Text,TouchableOpacity,FlatList} from 'react-native';
import { Header } from 'native-base';
import Styles from '../Styles';
import {connect} from 'react-redux'
import * as Actions from '../Actions';
import Feather from 'react-native-vector-icons/Feather';
import { store } from '../ConfigureStore';

const CourseDetails = (props) =>{
    return(
        <View style={[Styles.container,{backgroundColor:'#fff'}]}>
            <View style={{backgroundColor:'#2e5bb6', flexDirection:'row'}}>
                <Feather style={{padding:15}} size={24} color='#fff' name='chevron-left' onPress={()=>props.navigation.goBack()} />
            <Text style={{textAlign:'center', color:'#fff',padding:20}}>Course details</Text>
            </View>
            <View>
                <FlatList
                scrollEnabled={true}
                data={props.CourseList}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => {
                if(store.getState().SaveIndex.Index===index){
                return (
              <View style={{flex:1,padding:20}}>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Title</Text>
                        <Text style={Styles.detailsTextValue}>{item.Title}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Subject Code</Text>
                        <Text style={Styles.detailsTextValue}>{item.SubjectCode}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Project</Text>
                        <Text style={Styles.detailsTextValue}>{item.Project}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Project Description</Text>
                        <Text style={Styles.detailsTextValue}>{item.ProjectDescription}</Text>
                  </View>
              </View>          
           )
        }
        }}
                    />
                </View>
        </View>
    )
};

const mapStateToProps = state => {
    let CourseList;
    let courseIndex;
  
    if (state.SaveIndex && state.SaveIndex.Index) {
        courseIndex = state.SaveIndex.Index;
    }
    if (state.Student && state.Course.course) {
        CourseList = state.Course.course;
    }
    return {
        CourseList,   
        courseIndex   
    };
  };
export default connect(
    mapStateToProps,
    Actions
)(CourseDetails);
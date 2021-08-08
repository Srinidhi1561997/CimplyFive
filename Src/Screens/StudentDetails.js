import React from 'react';
import {View, Text,TouchableOpacity,FlatList} from 'react-native';
import { Header } from 'native-base';
import Styles from '../Styles';
import {connect} from 'react-redux'
import * as Actions from '../Actions';
import Feather from 'react-native-vector-icons/Feather';
import { store } from '../ConfigureStore';

const StudentDetails = (props) =>{
    let studentData;
    props.StudentList.map((item,index)=>{
        if(props.stuIndex===index){
            studentData=item;
        }
    })
    return(
        <View style={[Styles.container,{backgroundColor:'#fff'}]}>
            <View style={{backgroundColor:'#2e5bb6', flexDirection:'row'}}>
                <Feather style={{padding:15}} size={24} color='#fff' name='chevron-left' onPress={()=>props.navigation.goBack()} />
            <Text style={{textAlign:'center', color:'#fff',padding:20}}>Student details</Text>
            </View>
            <View>
                <View style={{
                    alignSelf:'center',
                    marginTop:20,}}>
                        <Feather name='user' size={60} style={{justifyContent:'center',backgroundColor:'grey',borderRadius:30}}/>
                </View>
                <View>
                    <FlatList
                    scrollEnabled={true}
                    data={props.StudentList}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                if(store.getState().SaveIndex.Index===index){
                return (
              <View style={{flex:1,padding:20}}>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Name</Text>
                        <Text style={Styles.detailsTextValue}>{item.Name}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>USN</Text>
                        <Text style={Styles.detailsTextValue}>{item.USN}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Current Semester</Text>
                        <Text style={Styles.detailsTextValue}>{item.CurrentSemester}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Total Grades</Text>
                        <Text style={Styles.detailsTextValue}>{item.TotalGrades}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Courses Offered</Text>
                        <Text style={Styles.detailsTextValue}>{item.CoursesOffered}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Phone Number</Text>
                        <Text style={Styles.detailsTextValue}>{item.PhoneNumber}</Text>
                  </View>
                  <View style={Styles.detailsContainer}>
                        <Text style={Styles.detailsText}>Gender</Text>
                        <Text style={Styles.detailsTextValue}>{item.Gender}</Text>
                  </View>
              </View>          
           )
        }
        }}
                    />
                </View>
            </View>
        </View>
    )
};

const mapStateToProps = state => {
    let stuIndex;
    let StudentList;
  
    if (state.Student && state.Student.student) {
        StudentList = state.Student.student;
    }
  
    if (state.SaveIndex && state.SaveIndex.Index) {
        stuIndex = state.SaveIndex.Index;
    }
    return {
        stuIndex,  
        StudentList    
    };
  };
export default connect(
    mapStateToProps,
    Actions
)(StudentDetails);
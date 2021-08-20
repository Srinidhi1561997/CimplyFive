import * as Actions from './../Actions';
import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { connect } from 'react-redux';
import Styles from '../Styles';
import { store } from '../ConfigureStore';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const CourseDb = (props) =>{
    const [CourseList,setCourseList] = useState([]);
    useEffect(()=>{
        setCourseList(props.CourseList);
    })
    return(
        <View style={[Styles.container,{backgroundColor:'#fff'}]}>
            <View style={{backgroundColor:'#2e5bb6', flexDirection:'row'}}>
                <Feather style={{padding:20}} size={24} color='#fff' name='chevron-left' onPress={()=>props.navigation.goBack()} />
            <Text style={{textAlign:'center', color:'#fff',padding:20}}>Course list</Text>
            </View>
            <View style={{flex:1}}>
                {props.CourseList.length===0?<Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',padding:10}}>
                    No Course list is available, please click on add button to add course.
                </Text>:
                <FlatList
                    contentContainerStyle={{flex:1}}
                    scrollEnabled={true}
                    data={CourseList}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                return (
              <View style={{flexDirection:"row",backgroundColor:index%2===0?'#e6e6ff':'#ffffff',padding:10}}>
                <TouchableOpacity style={{width:'95%'}}
                    onPress={()=>[store.dispatch(Actions.SaveIndex(index),props.navigation.navigate('CourseDetails'))]}>
                    <View style={{flexDirection:"row", padding:10}}>
                            <Feather name='book' color="#000" size={18} style={{paddingRight:10}}/>
                            <Text style={{textAlign:'center'}}>{item.Title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'flex-end',paddingVertical:10}}>
                    <Entypo name='cross' color='#b3b3b3' size={20}
                    onPress={()=>{store.dispatch(Actions.DeleteCourse(CourseList.filter((item,index1)=>index1!==index)))}} />
                </TouchableOpacity>
              <View style={{padding:2,borderBottomWidth:0.3, borderBottomColor:'#000'}}/>
              </View>           
           )
        }}
    />}
</View>           
    <TouchableOpacity
        onPress={() => props.navigation.navigate('CourseForm')}
        style={Styles.addButton}>
        <Text style={Styles.addButtonText}>+</Text>
    </TouchableOpacity>
</View>
    )
};

const mapStateToProps = state => {
    let CourseList;
    console.log('sdfghjkl',state)
    if (state.Course && state.Course.course) {
        CourseList = state.Course.course;
    }
    return {
        CourseList,      
    };
  };
export default connect(
    mapStateToProps,
    Actions
)(CourseDb);
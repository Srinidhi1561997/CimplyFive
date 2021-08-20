import React,{Component} from 'react';
import {View, Text,TouchableOpacity, TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import Styles from '../Styles';
import Feather from 'react-native-vector-icons/Feather';
import { store } from '../ConfigureStore';
import * as Actions from './../Actions';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

var CourseList = {};
class CourseForm extends Component{

    constructor(props){
        super(props);
        this.state={
            Title:'',
            SubjectCode:'',
            Project:'',
            ProjectDescription:'',
            CourseArray:[],
            validProjectDescription:0,
            required:0,
            isDatePickerVisible:false,
            date:'',
            time:'',
            isTimePickerVisible:false,
        }
    }
    onChangeText(key,value){
        this.setState({
          [key]:value
        })
        CourseList[key]=value;
      }

      SaveData(){
          this.resetState();
          this.state.CourseArray.push({...CourseList});
          store.dispatch(Actions.CourseDb(this.state.CourseArray));
          this.props.navigation.navigate('CourseDb');
      }

      resetState(){
          this.setState({
            Title:'',
            SubjectCode:'',
            Project:'',
            ProjectDescription:'',
            validProjectDescription:0,
            required:0,
            isDatePickerVisible:false,
            date:'',
            time:'',
          })
      }
      

    showDatePicker = () => {
        this.setState({isDatePickerVisible:true})
    };

    hideDatePicker = () => {
        this.setState({isDatePickerVisible:false})
    };

    handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date,moment(date).format('DD/MM/YYYY'));
        this.onChangeText('date', moment(date).format('DD/MM/YYYY'))
        this.setState({isDatePickerVisible:false});
    };

    showTimePicker = () => {
        this.setState({isTimePickerVisible:true})
    };

    hideTimePicker = () => {
        this.setState({isTimePickerVisible:false})
    };

    handleTimeConfirm = (time) => {
        console.warn("A Time has been picked: ", time,moment(time).format('hh:mm A'));
        this.onChangeText('time', moment(time).format('hh:mm A'));
        this.setState({isTimePickerVisible:false});
    };
    
    render(){
    return(
        <View style={[Styles.container,{backgroundColor:'#fff'}]}>
            <View style={{flexDirection:'row', backgroundColor:'#2e5bb6'}}>
                <Feather style={{padding:20}} size={24} color='#fff' name='chevron-left' onPress={()=>this.props.navigation.goBack()} />
                <Text style={{textAlign:'center', padding:20, alignItems:'center', color:'#fff'}}>Course details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <DismissKeyboard>
            <View style={{marginLeft: 20,marginRight: 20,marginTop: 10}}>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Title
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.Title}
                        onChangeText={value=>this.onChangeText('Title', value)}
                        style={Styles.formInput}
                        keyboardType='default'
                        placeholder='Computer science'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            this.setState({required:this.state.required+1})
                        }}
                    />
                    </View>
                    <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Subject Code
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.SubjectCode}
                        onChangeText={value=>this.onChangeText('SubjectCode', value)}
                        style={[Styles.formInput,{padding:3}]}
                        keyboardType='default'
                        placeholder='15CSJAVA21'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            this.setState({required:this.state.required+1});
                        }}
                    />
                    </View>
                    <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Project
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.Project}
                        onChangeText={value=>this.onChangeText('Project', value)}
                        style={[Styles.formInput,{padding:3}]}
                        placeholder='Iot'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            this.setState({required:this.state.required+1});
                        }}
                    />
                    </View>
                    <View>
                    <Text style={Styles.FormText}>
                        Schedule Date
                    </Text>
                    <View style={[Styles.formInput, {flexDirection:'row', padding:10}]}>
                     <TextInput
                        defaultValue=''
                        value={this.state.date}
                        editable={false}
                        style={{width:'95%', padding:3, color:'#000'}}
                        placeholder='dd/mm/yyyy'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            this.setState({required:this.state.required+1});
                        }}
                    />
                    <Entypo name="calendar" size={20} color="#000" style={{justifyContent:'flex-end'}}  onPress={()=>this.showDatePicker()}/>
                    </View>
                    </View>
                    <View>
                    <Text style={Styles.FormText}>
                        Schedule Time
                    </Text>
                    <View style={[Styles.formInput, {flexDirection:'row', padding:10}]}>
                     <TextInput
                        defaultValue=''
                        value={this.state.time}
                        editable={false}
                        // onChangeText={value=>this.onChangeText('date', value)}
                        style={{width:'95%', padding:3, color:'#000'}}
                        placeholder='hh:mm'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            this.setState({required:this.state.required+1});
                        }}
                    />
                    <Ionicons name="time" size={20} color="#000" style={{justifyContent:'flex-end'}}  onPress={()=>this.showTimePicker()}/>
                    </View>
                    </View>
                    <View>
                    <Text style={Styles.FormText}>
                        Project description
                    </Text>
                    <TextInput
                        defaultValue=''
                        value={this.state.ProjectDescription}
                        onChangeText={value=>this.onChangeText('ProjectDescription', value)}
                        style={[Styles.formInput,{marginBottom:0,height:100,textAlignVertical: 'top'}]}
                        placeholder='Project Description'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        maxLength={100}
                        onBlur={()=>{
                            this.setState({required:this.state.required+1})
                        }}
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>
            </View>
            </DismissKeyboard>
            {this.state.required>0?
            <TouchableOpacity style={[Styles.saveButton,{backgroundColor:'#2e5bb6'}]} onPress={()=>this.SaveData()}>
                <Text style={[Styles.loginButtonText,{color:'#fff'}]}>Save</Text>
            </TouchableOpacity>:
            <TouchableOpacity style={[Styles.saveButton,{backgroundColor:'grey'}]} onPress={()=>{}}>
                <Text style={[Styles.loginButtonText,{color:'#fff'}]}>Save</Text>
            </TouchableOpacity>}
            </ScrollView>
            <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleDateConfirm}
                onCancel={this.hideDatePicker}
                display={'spinner'}
                minimumDate={new Date()}
            />
            <DateTimePickerModal
                isVisible={this.state.isTimePickerVisible}
                mode="time"
                onConfirm={this.handleTimeConfirm}
                onCancel={this.hideTimePicker}
                display={'spinner'}
            />
        </View>
    )
  }
};

const mapStateToProps = state => {
    let signed;
  
    if (state.signedReducer && state.signedReducer.signed) {
        signed = state.signedReducer.signed;
    }
    return {
        signed,      
    };
  };

export default connect(
  mapStateToProps,
  Actions,
)(CourseForm);
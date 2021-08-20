import React,{Component} from 'react';
import {View, Text,TouchableOpacity, TextInput,ScrollView} from 'react-native';
import { Header } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DismissKeyboard from '../Components/DismissKeyboard';
import Styles from '../Styles';
import {Courses,Gender,CurrentSemester} from './Data';
import * as Constants from '../Constants';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import * as Actions from '../Actions';
import {store} from '../ConfigureStore';
import * as Validate from '../Components/Validation';

var StudentList = {};
class StudentForm extends Component{

    constructor(props){
        super(props);
        this.state={
            USN:'',
            CurrentSemester:'',
            TotalGrades:'',
            CoursesOffered:'',
            Email:'',
            Gender:'',
            PhoneNumber:'',
            radioSelected:0,
            StudentArray:[],
            required:0,
            Name:'',
            validateName:false,
            validateUSN: false,
            validatePhoneNumber:false,
            validateEmail:false,
            validateGender:false,
            validateSemester: false,
            validateGrades: false,
            validateCourse: false,
        }
    }
    onChangeText(key,value){
        this.setState({
          [key]:value
        })
        StudentList[key]=value;
      }

      SaveData(){
          this.state.StudentArray.push({...StudentList});
          store.dispatch(Actions.StudentDb(this.state.StudentArray));
          this.props.navigation.navigate('StudentDb');
          this.resetState();
      }

      resetState(){
          this.setState({
            USN:'',
            CurrentSemester:'',
            TotalGrades:'',
            CoursesOffered:'',
            Email:'',
            Gender:'',
            PhoneNumber:'',
            radioSelected:0,
            StudentArray:[],
            validPhoneNumber:0,
            validEmail:0,
            required:0,
            Name:'',
            validateName:false,
            validateUSN: false,
            validatePhoneNumber:false,
            validateEmail:false,
            validateGender:false,
            validateSemester: false,
            validateGrades: false,
            validateCourse: false,
          })
      }

      radioClick(type,id) {
        this.setState({
          Gender: type,
          radioSelected:id
        });
        this.onChangeText('Gender',type);
      }

      RadioButton(){
            return (
              <View style={{flexDirection:'row', marginLeft:-10,marginBottom:10}}>
                  {Gender.map((val)=>
                  <TouchableOpacity key={val.id} onPress={()=>[this.radioClick(val.type,val.id),this.setState({
                    Gender: val.type})]} style={{flexDirection:"row", padding:10}}>
                    <View style= {{
                      height: 22,
                      width: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>  
                      {
                        val.id === this.state.radioSelected ?
                          <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                          }} />
                          : null
                      }
                    </View>
                    <Text style={{paddingLeft:15, paddingTop:2}}>{val.type}</Text>
                    </TouchableOpacity>
                  )}
                    </View>
                    )           
        }
      
    render(){
    return(
        <View style={[Styles.container,{backgroundColor:'#fff'}]}>
            <View style={{flexDirection:'row', backgroundColor:'#2e5bb6'}}>
                <Feather style={{padding:20}} size={24} color='#fff' name='chevron-left' onPress={()=>this.props.navigation.goBack()} />
                <Text style={{textAlign:'center', padding:20, alignItems:'center', color:'#fff'}}>Student details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <DismissKeyboard>
            <View style={{marginLeft: 20,marginRight: 20,marginTop: 10}}>
            <View style={{marginBottom: 20}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Name
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.Name}
                        onChangeText={value=>this.onChangeText('Name', value)}
                        style={Styles.formInput}
                        placeholder='Abhilasha'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            if(Validate.validateString(this.state.Name)){
                                this.setState({validateName:true})
                            } else {
                                this.setState({validateName:false})
                            }
                        }}
                    />
                    {this.state.validateName?
                        <Text style={{fontSize:12,color:'red'}}>Invalid name</Text>:null}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        USN
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.USN}
                        onChangeText={value=>this.onChangeText('USN', value)}
                        style={Styles.formInput}
                        keyboardType='default'
                        placeholder='1VE15CS089'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            if(Validate.validateAlphaNumeric(this.state.USN)){
                                this.setState({validateUSN:true})
                            } else {
                                this.setState({validateUSN:false})
                            }
                        }}
                    />
                    {this.state.validateUSN?
                        <Text style={{fontSize:12,color:'red'}}>Invalid USN</Text>:null}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Current Semester
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <Dropdown
                        data={CurrentSemester}
                        dropdownOffset={{ top: 0, right: 0}}
                        dropdownPosition={-4.5}
                        selectedItemColor="#000000"
                        itemPadding={7}
                        textColor="#000"
                        baseColor="#000"
                        itemColor="grey"
                        itemCount={3}
                        shadeOpacity={0.12}
                        animationDuration={150}
                        valueExtractor={({value}) =>value}
                        onChangeText={(value, key) => {
                            this.setState({CurrentSemester:value});
                            this.onChangeText('CurrentSemester', value)
                        }}
                        onBlur={()=>{
                            if(Validate.validateAlphaNumericWithSpace(this.state.CurrentSemester)){
                                this.setState({validateSemester:true})
                            } else {
                                this.setState({validateSemester:false})
                            }
                        }}
                        underlineColor='white'
                        value={this.state.CurrentSemester}
                        placeholder='Choose Semester'
                        placeholderTextColor="grey"
                        pickerStyle={{width:'80%', padding:10}}
                        containerStyle={[{ width:'100%',placeholderTextColor:'grey'},Styles.formInput]}
                        style={{fontSize:16}}
                        underlineColorAndroid="transparent"
                        inputContainerStyle={{ borderBottomColor:'transparent', paddingTop:10,paddingLeft:5}}
                    />
                    {this.state.validateSemester?
                        <Text style={{fontSize:12,color:'red'}}>Invalid Semester</Text>:null}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Total Grades
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.TotalGrades}
                        onChangeText={value=>this.onChangeText('TotalGrades', value)}
                        style={Styles.formInput}
                        keyboardType='default'
                        placeholder='Total Grades'
                        keyboardType='default'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            if(Validate.validateAlphaNumericWithSpace(this.state.TotalGrades)){
                                this.setState({validateGrades:true})
                            } else {
                                this.setState({validateGrades:false})
                            }
                        }}
                    />
                    {this.state.validateGrades?
                        <Text style={{fontSize:12,color:'red'}}>Invalid grades</Text>:null}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Courses Offered
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <Dropdown
                        placeholder='Courses Offered'
                        data={Courses}
                        dropdownOffset={{ top: 0, right: 0}}
                        dropdownPosition={-4.5}
                        selectedItemColor="#000000"
                        itemPadding={7}
                        textColor="#000"
                        baseColor="#000"
                        itemColor="grey"
                        itemCount={3}
                        shadeOpacity={0.12}
                        animationDuration={150}
                        valueExtractor={({value}) =>value}
                        onChangeText={(value, key) => {
                            this.setState({CoursesOffered:value});
                            this.onChangeText('CoursesOffered', value)
                        }}
                        onBlur={()=>{
                            if(Validate.validateString(this.state.CoursesOffered)){
                                this.setState({validateCourse:true})
                            } else {
                                this.setState({validateCourse:false})
                            }
                        }}
                        underlineColor='white'
                        value={this.state.CoursesOffered}
                        placeholder='Select Course'
                        placeholderTextColor="grey"
                        pickerStyle={{width:'80%', padding:10}}
                        containerStyle={[{ width:'100%',placeholderTextColor:'grey'},Styles.formInput]}
                        style={{fontSize:16}}
                        underlineColorAndroid="transparent"
                        inputContainerStyle={{ borderBottomColor:'transparent', paddingTop:10,paddingLeft:5}}
                    />
                    {this.state.validateCourse?
                    <Text style={{fontSize:12,color:'red'}}>Invalid course</Text>:null}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Email
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.Email}
                        onChangeText={value=>this.onChangeText('Email', value)}
                        style={[Styles.formInput,{marginBottom:0}]}
                        placeholder='email'
                        keyboardType='email-address'
                        placeholderTextColor= '#c2c2d6'
                        onBlur={()=>{
                            if (Validate.validateEmail(this.state.Email)) {
                                this.setState({validEmail:true})
                              } else {
                                this.setState({validEmail:false})
                              }
                        }}
                    />
                    {this.state.validEmail?
                    <Text style={{fontSize:12,color:'red'}}>Invalid email format</Text>:null}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={[Styles.FormText,{paddingTop:20}]}>
                        Gender
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:25}}/>
                    </View>
                    {this.RadioButton()}
                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={Styles.FormText}>
                        Phone Number
                    </Text>
                    <Fontisto name='asterisk' size={8} color='red' style={{paddingTop:5}}/>
                    </View>
                    <TextInput
                        defaultValue=''
                        value={this.state.PhoneNumber}
                        onChangeText={value=>this.onChangeText('PhoneNumber', value)}
                        style={[Styles.formInput,{marginBottom:0}]}
                        placeholder='PhoneNumber'
                        keyboardType='number-pad'
                        placeholderTextColor= '#c2c2d6'
                        maxLength={10}
                        onBlur={()=>{
                            if (Validate.validatePhoneNumber(this.state.PhoneNumber)) {
                                this.setState({validPhoneNumber: true})
                              } else {
                                this.setState({validPhoneNumber: false})
                              }
                        }}
                    />
                    {this.state.validPhoneNumber?
                    <Text style={{fontSize:12,color:'red'}}>Invalid phone number format</Text>:null}
                </View>
            </View>
            </DismissKeyboard>
            {this.state.validateName && 
            this.state.validPhoneNumber && 
            this.state.validEmail && 
            this.state.validateCourse && 
            this.state.validateGender && 
            this.state.validateGrades &&
            this.state.validateUSN ?
            <TouchableOpacity style={[Styles.saveButton,{backgroundColor:'#2e5bb6'}]} onPress={()=>this.SaveData()}>
                <Text style={[Styles.loginButtonText,{color:'#fff'}]}>Save</Text>
            </TouchableOpacity>:
            <TouchableOpacity style={[Styles.saveButton,{backgroundColor:'grey'}]} onPress={()=>{}}>
                <Text style={[Styles.loginButtonText,{color:'#fff'}]}>Save</Text>
            </TouchableOpacity>}
            </ScrollView>
        </View>
    )
      }
};

 export default StudentForm;
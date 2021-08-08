import React,{Component} from 'react';
import {View, Text,TouchableOpacity, TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DismissKeyboard from '../Components/DismissKeyboard';
import Styles from '../Styles';
import Feather from 'react-native-vector-icons/Feather';
import { store } from '../ConfigureStore';
import * as Actions from './../Actions';

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
        }
    }
    onChangeText(key,value){
        this.setState({
          [key]:value
        })
        CourseList[key]=value;
      }

      SaveData(){
          this.state.CourseArray.push({...CourseList});
          store.dispatch(Actions.CourseDb(this.state.CourseArray))
          this.props.navigation.navigate('CourseDb');
          this.resetState();
      }

      resetState(){
          this.setState({
            Title:'',
            SubjectCode:'',
            Project:'',
            ProjectDescription:'',
            // CourseArray:[],
            validProjectDescription:0,
            required:0,
          })
      }
      
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
                    <Text style={Styles.FormText}>
                        Title
                    </Text>
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
                    <Text style={Styles.FormText}>
                        Subject code
                    </Text>
                    <TextInput
                        defaultValue=''
                        value={this.state.SubjectCode}
                        onChangeText={value=>this.onChangeText('SubjectCode', value)}
                        style={Styles.formInput}
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
                    <Text style={Styles.FormText}>
                        Project
                    </Text>
                    <TextInput
                        defaultValue=''
                        value={this.state.Project}
                        onChangeText={value=>this.onChangeText('Project', value)}
                        style={Styles.formInput}
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
            {this.state.required===4?
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
import React, {Component} from 'react';
import {
  StyleSheet,
  Alert,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Image,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import Amplify, {Auth, Hub} from 'aws-amplify';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';//MaterialIcons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import config from '../../aws-exports';
import * as Constants from '../Constants';
import Loader from '../Components/Loader';
import {store} from '../ConfigureStore';
import * as Actions from '../Actions/index';
import DismissKeyboard from '../Components/DismissKeyboard';
import CloseAppMsg from '../Components/CloseAppMsg';
import { windowHeight } from '../Components/Dimensions';

Amplify.configure(config);
const isAndroid = Platform.OS === 'android';
class Login extends Component {
    static navigationOptions={
        headerShown: false,
    }

  constructor(props) {
    super(props);
    this.state = {
      currentState: Constants.STATE_NORMAL,
      loading: false,
      securePassword:true,
      firstTime: true,
      backButtonPressed:false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    const {currentState} = this.state;
    this.setState({backButtonPressed:true})
      // BackHandler.exitApp();
  return true;
}

componentWillMount() {
  const {currentState} = this.state;
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleCallback = (childData) =>{
  if(childData===Constants.NO){
    this.setState({backButtonPressed: false})
  }    
}

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    isAndroid && StatusBar.setBackgroundColor('#2e5bb6');
}

showLoader = () => {
  this.setState({ loading: true });
};

validatenewPassword() {
    const { email,newPassword, verificationCode } = this.state;
    let newPasswordValidated = false;
    let verificationCodeValidate =false;
    if (newPassword && newPassword.length >= Constants.EIGHT) {
      newPasswordValidated = true;
    }
    if (verificationCode) {
      if (verificationCode.length === Constants.SIX) {
        verificationCodeValidate = true;
      }
    }
    return newPasswordValidated === true && verificationCodeValidate === true ;
  }

  updatePassword(){
    this.showLoader();
    Auth.forgotPasswordSubmit(this.state.email,this.state.verificationCode, this.state.newPassword)
    .then(res=>{
      this.hideLoader();
      this.setState({ currentState: Constants.STATE_NORMAL, email:'' });
      setTimeout(()=>{Snackbar.show({
        text: Constants.NEWPASSWORD_SUCCESS,
        duration: Constants.SNACKBAR_DURATION_SHORT
      });},20)
    })
    .catch(err=>{
      this.hideLoader();
      this.setState({verificationCode:'',newPassword:'',currentState: Constants.STATE_FORGOT_PASSWORD})
      if(err.message === 'Invalid verification code provided, please try again.') {
        setTimeout(()=>{Snackbar.show({
          text: Constants.ERR_MSG7,
          duration: Constants.SNACKBAR_DURATION_LONG
        });},10)
      } else if (err.code === 'InvalidPasswordException') {
        setTimeout(()=>{Snackbar.show({
          text: Constants.ERR_MSG8,
          duration: Constants.SNACKBAR_DURATION_LONG
        });},10)
      } 
      else if (err.message === 'Attempt limit exceeded, please try after some time.') {
        setTimeout(()=>{Snackbar.show({
          text: err.message,
          duration: Constants.SNACKBAR_DURATION_LONG
        });},10)
      }     
    })
  }


resetFields(){
  this.setState({
    password:'',
    phone_number:'',
    email:'',
    authCode: '',
    verificationCode:'',
    newPassword:''
  })
}

hideLoader = () => {
  this.setState({ loading: false });
};

forgotPassword(){
    this.showLoader();
    if(Constants.GMAIL.test(this.state.email)) {
    Auth.forgotPassword(this.state.email)
    .then(res=>{
      this.hideLoader();
      this.setState({ currentState: Constants.STATE_FORGOT_PASSWORD_REQUESTED});
      setTimeout(()=>{Snackbar.show({
        text: Constants.REQUEST_VC,
        duration: Constants.SNACKBAR_DURATION_SHORT
      });},20)
    })
    .catch(err=>{
      this.hideLoader();
      this.setState({email:''})
      setTimeout(()=>{Snackbar.show({
        text: Constants.INVALID_EMAIL,
        duration: Constants.SNACKBAR_DURATION_LONG
      });},50)
    })
  }else {
    this.hideLoader();
      this.setState({
        currentState: Constants.STATE_FORGOT_PASSWORD_REQUESTED,
        email:'',
        loading:false
      });
      setTimeout(()=>{Snackbar.show({
        text: Constants.INVALID_EMAIL,
        duration: Constants.SNACKBAR_DURATION_LONG
      });},20)
  }  
  }

  validateSignUp() {
    const { password, email } = this.state;
    let passwordValidated = false;
    let emailValidated = false;
    if (email && email.length > Constants.SEVEN) {
      emailValidated = true;
    }
    if (password) {
      if (password.length >= Constants.EIGHT) {
        passwordValidated = true;
      }
    }
    return passwordValidated === true && emailValidated === true;
  }


  // verify signup user
  verify(){
    this.showLoader();
    if(Constants.GMAIL.test(this.state.email)) {
    Auth.confirmSignUp(this.state.email, this.state.authCode)
    .then(res=>{
      this.hideLoader();
      this.setState({currentState:Constants.STATE_NORMAL, loading: false,email:'',authCode:''});
      setTimeout(()=>{Snackbar.show({
        text: Constants.VERIFIED_SUCCESS,
        duration: Constants.SNACKBAR_DURATION_SHORT
      });},20)
    })
    .catch(err=>{
      this.hideLoader();
      this.setState({
        currentState: Constants.STATE_VERIFICATION_SIGNUP,
        authCode: '',
        email:'',
        loading:false
      });
      if(err.code === 'CodeMismatchException'){
        setTimeout(()=>{Snackbar.show({
          text: Constants.ERR_MSG7,
          duration: Constants.SNACKBAR_DURATION_LONG
        });},10)
      } else if(err.code === 'UserNotFoundException'){
        setTimeout(()=>{Snackbar.show({
          text: Constants.INVALID_USERNAME,
          duration: Constants.SNACKBAR_DURATION_LONG
        });},10)
      } 
    })
  }else {
    this.hideLoader();
      this.setState({
        password:'',
        email:'',
        loading:false,
        authCode:''
      });
      setTimeout(()=>{Snackbar.show({
        text: Constants.INVALID_EMAIL,
        duration: Constants.SNACKBAR_DURATION_LONG
      });},20)
  }   
  }

  validateAuthCode() {
    const { email, authCode } = this.state;
    let emailValidated = false;
    let authCodeValidated = false;
    if (email && email.length > Constants.ZERO) {
      emailValidated = true;
    }
    if (authCode) {
      if (authCode.length === Constants.SIX) {
        authCodeValidated = true;
      }
    }
    return emailValidated === true && authCodeValidated === true;
  }

  signUp() {
    this.showLoader();
    if(Constants.GMAIL.test(this.state.email)) {
      Auth.signUp({
        username:this.state.email,
        password: this.state.password,
      })
      .then(res=>{
        this.hideLoader();
        this.setState({currentState: Constants.STATE_VERIFICATION_SIGNUP, loading: false,email:'',password: '', authCode:''})
        setTimeout(()=>{Snackbar.show({
          text: Constants.SIGNUP_SUCCESS,
          duration: Constants.SNACKBAR_DURATION_SHORT
        });},20)
      })
      .catch(err=>{
        this.hideLoader();
        this.setState({
          currentState: Constants.STATE_NEW_SIGN_UP,
          password:'',
          email:'',
          loading:false
        });
        if(err.code === 'InvalidPasswordException'){
          setTimeout(()=>{Snackbar.show({
            text: Constants.ERR_MSG8,
            duration: Constants.SNACKBAR_DURATION_LONG
          });},10)
        } else if(err.code === 'InvalidParameterException'){
          setTimeout(()=>{Snackbar.show({
            text: Constants.ERR_MSG9,
            duration: Constants.SNACKBAR_DURATION_LONG
          });},10)
        }else if(err.code === 'UsernameExistsException') {
          setTimeout(()=>{Snackbar.show({
            text: Constants.ERR_MSG10,
            duration: Constants.SNACKBAR_DURATION_LONG
          });},10)
        }
      })
    } else {
      this.hideLoader();
        this.setState({
          currentState: Constants.STATE_NEW_SIGN_UP,
          password:'',
          email:'',
          loading:false
        });
        setTimeout(()=>{Snackbar.show({
          text: Constants.INVALID_EMAIL,
          duration: Constants.SNACKBAR_DURATION_LONG
        });},20)
    }    
  }


validateEmail() {
    const { email } = this.state;
    let emailValidated = false;
    if (email && email.length>Constants.ZERO) {
      emailValidated = true;
    }
    return emailValidated;
  }

getGreetingTime = (currentTime) => {
  if (!currentTime || !currentTime.isValid()) {
    return 'Hello';
  }
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(currentTime.format('HH'));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'Good afternoon';
  }
  if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'Good evening';
  }
  // Between dawn and noon
  return 'Good morning';
};

  state={
    authCode:'',
    password:'',
    email:'',
    phone_number:'',
    newPassword: '',
    verificationCode: '',
  }
  onChangeText(key,value){
    this.setState({
      [key]:value
    })
  }


  // signin function
  signIn(){
    this.showLoader();
    if(Constants.GMAIL.test(this.state.email)) {
    Auth.signIn({username:this.state.email,
        password:this.state.password})
    .then(res=>{
      this.getTokens();      
      this.hideLoader();
      this.setState({
        email:'',
        password:''
      })
      setTimeout(()=>{Snackbar.show({
        text: Constants.SIGNIN_SUCCESS,
        duration: Constants.SNACKBAR_DURATION_SHORT
      });},20)
    })   
    .catch(err=>{     
      this.hideLoader();
      this.setState({
        currentState: Constants.STATE_NORMAL,
        email:'',
        password:''
      })
      setTimeout(()=>{Snackbar.show({
        text: Constants.ERR_MSG3,
        duration: Constants.SNACKBAR_DURATION_LONG
      });}, 10)
    })
  }else {
    this.hideLoader();
      this.setState({
        currentState: Constants.STATE_NORMAL,
        password:'',
        email:'',
        loading:false
      });
      setTimeout(()=>{Snackbar.show({
        text: Constants.INVALID_EMAIL,
        duration: Constants.SNACKBAR_DURATION_LONG
      });},20)
  }  
  }

  // toggle eye for show and hide password
  toggleShowPassword(){
    this.setState({
      securePassword: !this.state.securePassword
    });
  }

  // getTokens function
  getTokens(){
    Auth.currentSession()
    .then(res=>{
      Auth.currentUserInfo()
      .then(res=>{
        store.dispatch(Actions.signed(true));
        this.props.navigation.navigate('ButtonScreen');
      })
    })
    .catch(err=>{
      
    })
  }

  // validate username and password length
  validate() {
    const { email, password } = this.state;
    let emailValidated = false;
    let passwordValidated = false;

    if (email && email.length > Constants.ZERO) {
      emailValidated = true;
    }
    if (password) {
      if (password.length >= Constants.EIGHT) {
        passwordValidated = true;
      }
    }
    return emailValidated === true && passwordValidated === true;
  }

  showMessage1(message, subtitle) {
    return (
      <View>
        <Text style={Styles.loginSubtitleTextStyle} >{subtitle}</Text> 
      </View>
    );
  }

  showMessage2(message) {
    return (
      <View>
         <Text style={Styles.goodMorningTextStyle}>{message}</Text>
      </View>
    );
  }


  showMain() {
    const { currentState } = this.state;
    // let message = this.getGreetingTime(moment());   
    let message='CimplyFive';
    let subtitle = Constants.WELCOME_BACK;
    let loginText = Constants.LOGIN;
    if (currentState === Constants.STATE_NORMAL) {
      loginText=Constants.LOGIN;
      // message='hello'
    } else if (currentState === Constants.STATE_PASSWORD_UPDATED) {
        message = '';
        subtitle = 'Password Successfully Updated\n' + 'You are all set to go!';
        loginText = 'Proceed to Login';
      } else if (currentState === Constants.STATE_FORGOT_PASSWORD) {
        message = '';
        subtitle = 'Enter your username';
      } else if (currentState === Constants.STATE_FORGOT_PASSWORD_REQUESTED) {
        message = '';
        subtitle = 'Set a new password';
      }

    return (
      <View style={[Styles.container,{backgroundColor:'#2e5bb6'}]}>
        {/* <DismissKeyboard> */}
        <Loader loading={this.state.loading} />
        <CloseAppMsg backButtonPressed={this.state.backButtonPressed} parentCallback = {this.handleCallback}/>
        <KeyboardAvoidingView
          style={{flex:1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled
        >
          <View style={Styles.logoContainer}>
            {this.showMessage1(message, subtitle)}
            </View>
            <View>
              {this.showMessage2(message)}
            </View>
            <View animation="fadeInUpBig" style={Styles.footer}>             
            {this.getMainContainer(loginText, subtitle)}
          </View>
        </KeyboardAvoidingView>
      {/* </DismissKeyboard> */}
      </View>
    );
  }

  getMainContainer(loginText, subtitle) {
    const { currentState } = this.state;
    if (currentState === Constants.STATE_NORMAL) {
      return this.showLoginContainer(loginText, subtitle);
    }
    if (currentState === Constants.STATE_FORGOT_PASSWORD) {
    return this.getForgotPassContainer('RESET PASSWORD', subtitle);
    }
    if (currentState === Constants.STATE_FORGOT_PASSWORD_REQUESTED) {
    return this.showMainContainerforChangePassword('UPDATE', subtitle);
    }
    if (currentState === Constants.STATE_NEW_SIGN_UP) {
        return this.showSignUpContainer(loginText, subtitle);
    }
    if (currentState === Constants.STATE_VERIFICATION_SIGNUP) {
        return this.showVerificationSignupContainer(loginText, subtitle);
    }
    return null;
  }


showLoginContainer(loginText,subtitle){
    return (
    //   <DismissKeyboard>
      <View animation="fadeInUpBig" style={Styles.signUpFormContainer}>        
        <View style={Styles.loginContainer}>
          <Feather name='mail' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.email}
        onChangeText={value=>this.onChangeText('email', value)}
        style={Styles.input}
        placeholder='Email'
        keyboardType='email-address'
        placeholderTextColor= '#c2c2d6'
      />
      </View>
      <View style={Styles.loginContainer}>
          <Feather name='lock' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.password}
        onChangeText={value=>this.onChangeText('password', value)}
        keyboardType='default'
        style={Styles.input}
        placeholder='Password'
        secureTextEntry={this.state.securePassword}
        placeholderTextColor= '#c2c2d6'
      />
      <TouchableOpacity style={Styles.showHideButton} onPress={()=>this.toggleShowPassword()}>
        {this.state.securePassword?<Feather name="eye-off" size={15} color="white"/>:<Feather name="eye" size={15} color="white"/>}
      </TouchableOpacity>
      </View>
      {this.validate()?
      <TouchableOpacity
          onPress={()=>{
            Keyboard.dismiss();
            if (this.state.currentState === Constants.STATE_NORMAL) {
              if (this.validate()){
                this.signIn();
              }  else {
                Snackbar.show({
                  text: Constants.ERR_MSG3,
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            }}}
              style={[Styles.loginButton, {backgroundColor:'#fff'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>:<TouchableOpacity
              style={[Styles.loginButton, {backgroundColor:'#7575a3'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>
  }
      <View>
      <Text
           onPress={() => {
                  [
                    this.setState({ currentState: Constants.STATE_FORGOT_PASSWORD }), 
                    this.resetFields()]
                }}
                style={[Styles.signUpButton, {fontWeight:'bold'}]}
              >{Constants.FORGOT_PWD}</Text>
            </View>
      <View style={Styles.signUpTextContent}>
            <Text style={Styles.signUpTextstyle}>{Constants.NO_ACCOUNT}  </Text>
              <Text
                onPress={() =>
                   {
                  [
                    this.setState({ currentState: Constants.STATE_NEW_SIGN_UP }), 
                    this.resetFields()]
                }
              }
                style={[Styles.signUpButton, {fontWeight:'bold'}]}
              >{Constants.SIGNUP}</Text>
            </View>
      </View> 
    //   </DismissKeyboard>
    );
  }

  showMainContainerforChangePassword(loginText, subtitle) {
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <DismissKeyboard> */}
      <View animation="fadeInUpBig" style={Styles.signUpFormContainer}>
      <View style={Styles.loginContainer}>
          <MaterialIcons name='verified-user' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.verificationCode}
        keyboardType='number-pad'
        onChangeText={value=>this.onChangeText('verificationCode', value)}
        style={Styles.input}
        maxLength={6}
        placeholder='Verification code'
        placeholderTextColor= '#c2c2d6'
        text="(sent to registered email)"
      />
      </View>
      <View style={Styles.loginContainer}>
          <Feather name='lock' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.newPassword}
        onChangeText={value=>this.onChangeText('newPassword', value)}
        style={Styles.input}
        keyboardType='default'
        secureTextEntry={this.state.securePassword}
        placeholder='Password'
        text="(Enter new password)" 
        placeholderTextColor= '#c2c2d6' 
      />
      <TouchableOpacity style={Styles.showHideButton} onPress={()=>[this.toggleShowPassword()]}>
        {this.state.securePassword?<Feather name="eye-off" size={15} color="white"/>:<Feather name="eye" size={15} color="white"/>}
      </TouchableOpacity>
      </View>
      <Text style={{color:'#c2c2d6', fontSize:12, padding:1}}>{Constants.PASSWORD_RULES}</Text>
      {/* {this.showButton(loginText)} */}
      {this.validatenewPassword()?
      <TouchableOpacity
          onPress={()=>{
            Keyboard.dismiss();
            if (this.state.currentState === Constants.STATE_FORGOT_PASSWORD_REQUESTED ) {
              if (this.validatenewPassword()) {
                this.updatePassword();
              } else {
                Snackbar.show({
                  text: Constants.ERR_MSG6,
                  duration: Snackbar.LENGTH_SHORT,
                });
              }               
            }
          }}
              style={[Styles.loginButton, {backgroundColor:'#fff'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>:<TouchableOpacity
              style={[Styles.loginButton, {backgroundColor:'#7575a3'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>
  }
  <View>
              <Text
                onPress={() => {
                  [this.setState({
                    currentState: Constants.STATE_FORGOT_PASSWORD,
                    loading: false,
                  }),this.resetFields()]}}
                style={{margin: 20, color:'#fff', fontSize: 16, fontWeight:'bold'}}
               >{Constants.GOBACK}</Text>
            </View> 
      </View>
      {/* </DismissKeyboard> */}
      </ScrollView>
    );
  }

  showSignUpContainer(loginText, subtitle) {
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        <DismissKeyboard>
      <View animation="fadeInUpBig" style={Styles.signUpFormContainer}>   
      <View style={Styles.loginContainer}>
          <Feather name='mail' size={24} color="#c2c2d6"/>
      <TextInput
        keyboardType='email-address'
        defaultValue=''
        value={this.state.email}
        onChangeText={value=>this.onChangeText('email', value)}
        style={Styles.input}
        placeholder='Email'
        placeholderTextColor= '#c2c2d6'
      />
      </View>
      <View style={Styles.loginContainer}>
          <Feather name='lock' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.password}
        onChangeText={value=>this.onChangeText('password', value)}
        style={Styles.input}
        keyboardType='default'
        secureTextEntry={this.state.securePassword}
        placeholder='Password'
        placeholderTextColor= '#c2c2d6'
      />
      <TouchableOpacity style={Styles.showHideButton} onPress={()=>this.toggleShowPassword()}>
        {this.state.securePassword?<Feather name="eye-off" size={15} color="white"/>:<Feather name="eye" size={15} color="white"/>}
      </TouchableOpacity>
      </View>
      <Text style={{color:'#c2c2d6', fontSize:12, padding:1}}>{Constants.PASSWORD_RULES}</Text>
      
      {this.validateSignUp() ?
      <TouchableOpacity
          onPress={()=>{
            Keyboard.dismiss();
            if (this.state.currentState === Constants.STATE_NEW_SIGN_UP) {
              if (this.validateSignUp()) {
                this.signUp();
              } else {
                Snackbar.show({
                  text: Constants.ERR_MSG1,
                  duration: Constants.SNACKBAR_DURATION_SHORT,
                });
              }}}}
              style={[Styles.loginButton, {backgroundColor:'#fff'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>:<TouchableOpacity
              style={[Styles.loginButton, {backgroundColor:'#7575a3'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>
  }
      <View style={Styles.signUpTextContent}>
            <Text style={[Styles.signUpTextstyle,{paddingRight:10}]}>{Constants.SIGN_IN_TEXT}</Text>
              <Text
                onPress={() => {
                  [this.setState({ currentState: Constants.STATE_NORMAL }), this.resetFields()]
                }}
                style={[Styles.signUpButton, {fontWeight:'bold'}]}
              >{Constants.SIGNIN}</Text>
            </View>
      </View>
      </DismissKeyboard>
      </ScrollView>
    );
  }

   //signup verification container
   showVerificationSignupContainer(loginText, subtitle) {
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        <DismissKeyboard>
      <View animation="fadeInUpBig" style={Styles.signUpFormContainer}>
      <View style={Styles.loginContainer}>
          <Feather name='mail' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.email}
        onChangeText={value=>this.onChangeText('email', value)}
        keyboardType='email-address'
        style={Styles.input}
        placeholder='Email'
        placeholderTextColor= '#c2c2d6'
      />
      </View>
      <View style={Styles.loginContainer}>
          <MaterialIcons name='verified-user' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        keyboardType='number-pad'
        value={this.state.authCode}
        onChangeText={value=>this.onChangeText('authCode', value)}
        style={Styles.input}
        placeholder='Verification Code'
        placeholderTextColor= '#c2c2d6'
        // maxLength={6}
      />
      </View>
      {/* {this.showButton(loginText)} */}
      {this.validateAuthCode()?
      <TouchableOpacity
          onPress={()=>{
            Keyboard.dismiss();
            if (this.state.currentState === Constants.STATE_VERIFICATION_SIGNUP) {
              if (this.validateAuthCode()){
                this.verify();
              } else {
                Snackbar.show({
                  text: Constants.ERR_MSG5,
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            }}}
              style={[Styles.loginButton, {backgroundColor:'#fff'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>:<TouchableOpacity
              style={[Styles.loginButton, {backgroundColor:'#7575a3'}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>
  }
    <View>
        <Text
        onPress={() => {
            [this.setState({
            currentState: Constants.STATE_NORMAL,
            loading: false,
            }),this.resetFields()]}}
        style={{margin: 20, color:'#fff', fontSize: 16, fontWeight:'bold'}}
        >{Constants.GOBACK}</Text>
    </View> 
      </View>
      </DismissKeyboard>
      </ScrollView>
    );
  }

  getForgotPassContainer(loginText,subtitle){
    return(
      <View animation="fadeInUpBig" style={Styles.signUpFormContainer}>      
      <View style={Styles.loginContainer}>
          <Feather name='mail' size={24} color="#c2c2d6"/>
      <TextInput
        defaultValue=''
        value={this.state.email}
        onChangeText={value=>this.onChangeText('email', value)}
        style={Styles.input}
        keyboardType='default'
        placeholder='Email'
        keyboardType='email-address'
        placeholderTextColor= '#c2c2d6'
      />
      </View>
      {this.validateEmail()?
      <TouchableOpacity
          onPress={()=>{
            Keyboard.dismiss();
            if (this.state.currentState === Constants.STATE_FORGOT_PASSWORD) {
              if (this.validateEmail()) {
                this.forgotPassword();
              } else {
                Snackbar.show({
                  text: Constants.ERR_MSG4,
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            }}}
              style={[Styles.loginButton, {backgroundColor:'#fff', height:windowHeight/11}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>:<TouchableOpacity
              style={[Styles.loginButton, {backgroundColor:'#7575a3', height:windowHeight/11}]}
              >
             <Text style={Styles.loginButtonText}>{loginText}</Text>
              </TouchableOpacity>
  }
  <View>
        <Text
        onPress={() => {
            [this.setState({
            currentState: Constants.STATE_NORMAL,
            loading: false,
            }),this.resetFields()]}}
        style={{margin: 20, color:'#fff', fontSize: 16, fontWeight:'bold'}}
        >{Constants.GOBACK}</Text>
    </View> 
      </View>
    );
  }

  render() {
  return this.showMain();
}
}

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
)(Login);
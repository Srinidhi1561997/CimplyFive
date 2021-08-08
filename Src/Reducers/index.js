import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { LOG_OUT } from '../Actions/ActionConstants';
import signedReducer from './SignedReducer';
import Student from './Student';
import Course from './Course';
import SaveIndex from './SaveIndex';

const appReducer = combineReducers({
    signedReducer:signedReducer,
    Student:Student,
    Course:Course,
    SaveIndex:SaveIndex
});
 
const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};
 
export default rootReducer;
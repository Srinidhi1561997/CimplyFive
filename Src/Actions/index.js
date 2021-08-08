import {store} from '../ConfigureStore';
import * as reduxConstants from './ActionConstants';

export const logOut = () => ({ type: reduxConstants.LOG_OUT, payload: 'clear the state' });
export const signed = (signed) => ({
    type: reduxConstants.SIGNED_OR_NOT,
    payload: {
        signed,
    }
  });
  export const StudentDb = (student) => ({
    type: reduxConstants.STUDENT_DB,
    payload: {
        student,
    }
  });
  export const CourseDb = (course) => ({
    type: reduxConstants.COURSE_DB,
    payload: {
        course,
    }
  });
  export const SaveIndex = (Index) => ({
    type: reduxConstants.SAVE_INDEX,
    payload: {
        Index,
    }
  });
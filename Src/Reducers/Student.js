import { STUDENT_DB,DELETE_STUDENT } from '../Actions/ActionConstants';

export default (state = {student:[]}, action) => {
    if (action.type === STUDENT_DB) {
        return {
            student: state.student.concat(...action.payload.student)
          };
    }
    if (action.type === DELETE_STUDENT) {
        return {
            student: action.payload.student
        };
    }
      return state;
};
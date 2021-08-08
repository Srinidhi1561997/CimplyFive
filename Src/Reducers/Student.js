import { STUDENT_DB } from '../Actions/ActionConstants';

export default (state = {student:[]}, action) => {
    if (action.type === STUDENT_DB) {
        return {
            student: state.student.concat(...action.payload.student)
          };
      }
      return state;
};
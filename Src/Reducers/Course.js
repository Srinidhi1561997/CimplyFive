import { COURSE_DB,DELETE_COURSE } from '../Actions/ActionConstants';

export default (state = {course:[]}, action) => {
    if (action.type === COURSE_DB) {
        return {
             course: state.course.concat(...action.payload.course)
          };
      }
    if (action.type === DELETE_COURSE) {
        return {
            course : action.payload.course
        };
    }
      return state;
};
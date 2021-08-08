import { COURSE_DB } from '../Actions/ActionConstants';

export default (state = {course:[]}, action) => {
    if (action.type === COURSE_DB) {
        return {
             course: state.course.concat(...action.payload.course)
          };
      }
      return state;
};
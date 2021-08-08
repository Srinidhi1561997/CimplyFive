import { SAVE_INDEX } from '../Actions/ActionConstants';

export default (state = {Index:-1}, action) => {
    if (action.type === SAVE_INDEX) {
        return {
            ...state, Index: action.payload.Index
          };
      }
      return state;
};
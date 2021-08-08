import { SIGNED_OR_NOT } from '../Actions/ActionConstants';
const initialState= {
    signed:false
}
export default (state = {signed:false}, action) => {
    if (action.type === SIGNED_OR_NOT) {
        return {
            ...state, signed: action.payload.signed
          };
      }
      return state;
};
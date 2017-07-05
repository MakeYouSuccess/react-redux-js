import { SET_WEBSCENE } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_WEBSCENE:
        return action.scenelayer || initialState;
    default:
      return state;
  }
}

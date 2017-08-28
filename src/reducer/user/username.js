import { SET_IDENTITY } from '../../constants/action-types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IDENTITY:
      return action.username || initialState;
    default:
      return state;
  }
};

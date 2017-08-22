import { INIT_SCENE } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_SCENE:
      return action.name || initialState;
    default:
      return state;
  }
};

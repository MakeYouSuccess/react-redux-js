import { SELECTION_SET, SELECTION_TOGGLE, SELECTION_RESET } from './actions';

const initialState = [];

const hasItem = (array, OID) => array.indexOf(OID) > -1;

const addItem = (array, OID) => {
  const newArray = array.slice();
  newArray.push(OID);
  return newArray;
};

const removeItem = (array, OID) => {
  const newArray = array.slice();
  newArray.splice(array.indexOf(OID), 1);
  return newArray;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTION_SET:
      return action.OIDArray.slice();
    case SELECTION_TOGGLE:
      return hasItem(state, action.OID)
        ? removeItem(state, action.OID) : addItem(state, action.OID);
    case SELECTION_RESET:
      return initialState;
    default:
      return state;
  }
};

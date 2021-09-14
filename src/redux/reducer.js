import { SET_DATA, FETCHED_DATA, FETCHING_DATA, APPLY_FILTER } from './action_types';


const okkReducer = (state={}, action) => {
  if (action.type === SET_DATA) {
    let categories = [];
    action.payload.forEach(item => {
      if (!categories.includes(item.category.toLowerCase())) {
        categories = [...categories, item.category.toLowerCase()];
      }
    });
    return { ...state, data: action.payload, categories, originalData: action.payload };
  } 
  if (action.type === FETCHED_DATA) {
    return { ...state, loading: false };
  }
  if (action.type === FETCHING_DATA) {
    return { ...state, loading: true };
  }
  if (action.type === APPLY_FILTER) {
    if (action.payload.length > 0) {
      let data = state.data.filter(okr => action.payload.includes(okr.category.toLowerCase()));
      return { ...state, data };
    }
    return { ...state, data: state.originalData };
  }
  return state;
}

export default okkReducer;
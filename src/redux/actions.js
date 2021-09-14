import { SET_DATA, APPLY_FILTER, FETCHING_DATA, FETCHED_DATA } from './action_types';
import { fetchData } from '../utils';

export const fetchOkrs = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_DATA });
    fetchData()
    .then(result => {
      dispatch(setData(result.data));
      dispatch({ type: FETCHED_DATA });
    })
    .catch(err => console.error('Error', err));
  }
}

const setData = (payload) => {
  return { type: SET_DATA, payload };
}

export const applyFilter = (payload) => {
  return { type: APPLY_FILTER, payload }
}

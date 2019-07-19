import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS
} from './types';
import axios from 'axios';

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get('logs');
    const data = res.data;

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();

    const res = await axios('/logs', {
      method: 'post',
      data: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = res.data;

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await axios.delete(`/logs/${id}`);

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Update log from server
export const updateLog = log => async dispatch => {
  try {
    setLoading();

    const res = await axios(`/logs/${log.id}`, {
      method: 'put',
      data: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.data;

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Search logs
export const searchLogs = text => async dispatch => {
  try {
    setLoading();

    const res = await axios.get(`/logs?q=${text}`);
    const data = res.data;

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data
    });
  }
};

// Set current log for edit modal
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Clear a current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

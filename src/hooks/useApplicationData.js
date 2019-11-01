import { useReducer, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return action.value
      case SET_APPLICATION_DATA:
        return action.value
      case SET_INTERVIEW: {
        return action.value
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
}

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({type: 'SET_DAY', value: { ...state, day }})

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`)),
    ]).then((all) => {
      dispatch({type: 'SET_APPLICATION_DATA', value: {days: all[0].data, appointments: all[1].data, interviewers: all[2].data}})    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch({type: 'SET_INTERVIEW', value: {...state, appointments}})
    });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, interview)
    .then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch({type: 'SET_INTERVIEW', value: {...state, appointments}})
    });
  }
  return { cancelInterview, bookInterview, setDay, state }
}

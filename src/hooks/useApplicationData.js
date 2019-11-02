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

  function getSpotsForDay(oldstate, id, change) {
    const spots = oldstate.days.map((indexDay) => {
      if(oldstate.day === indexDay.name){
        return {...indexDay, spots: indexDay.spots + change} 
      }
      return indexDay 
    })
    return spots;
  }  

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`)),
    ]).then((all) => {
      dispatch({type: 'SET_APPLICATION_DATA', value: {...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}})    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: { ...interview }
        }
      };
      const days = getSpotsForDay(state, id, -1 )
      dispatch({type: 'SET_INTERVIEW', value: {...state, appointments, days}})
    });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, interview)
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: {
          ...state.appointments[id],
          interview: null
        }
      };
      const days = getSpotsForDay(state, id, +1 )
      dispatch({type: 'SET_INTERVIEW', value: {...state, appointments, days}})
    });
  }
  return { cancelInterview, bookInterview, setDay, state }
}

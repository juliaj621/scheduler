import { useReducer, useEffect } from "react";
import axios from 'axios';
import reducer from "../reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: 'SET_DAY', value: { ...state, day } });

  function getSpotsForDay(oldstate, id, change) {
    const spots = oldstate.days.map((indexDay) => {
      if (oldstate.day === indexDay.name) {
        return { ...indexDay, spots: indexDay.spots + change };
      }
      return indexDay;
    })
    return spots;
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`)),
    ]).then((all) => {
      dispatch({ type: 'SET_APPLICATION_DATA', value: { ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
    })
      .catch();
  }, []);

  function bookInterview(id, interview, number) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: { ...interview }
          }
        };
        const days = getSpotsForDay(state, id, number)
        dispatch({ type: 'SET_INTERVIEW', value: { ...state, appointments, days } })
      })
      .catch();
  };

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
        const days = getSpotsForDay(state, id, +1)
        dispatch({ type: 'SET_INTERVIEW', value: { ...state, appointments, days } })
      })
      .catch();
  }
  return { cancelInterview, bookInterview, setDay, state };
};

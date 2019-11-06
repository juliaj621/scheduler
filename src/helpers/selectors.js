function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(_day => _day.name === day);
  if (filteredDays.length > 0) {
    const appointmentIds = filteredDays[0].appointments;
    const appointmentsObj = appointmentIds.map(id => state.appointments[id]);
    return appointmentsObj;
  } else {
    return filteredDays;
  }
};

function getInterview(state, interview) {
  if (interview === null || undefined) {
    return null;
  } else {
    for (let key in state.interviewers) {
      let interviewer = state.interviewers[key];
      if (interviewer.id === interview.interviewer) {
        let student = interview.student;
        let newObj = { student, interviewer };
        return newObj;
      }
    }
  }
};

function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(_day => _day.name === day);
  if (filteredDays.length > 0) {
    const appointmentIds = filteredDays[0].interviewers;
    const interviewersObj = appointmentIds.map(id => state.interviewers[id]);
    return interviewersObj;
  } else {
    return filteredDays;
  }
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay }
import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
  return (
    <React.Fragment>
    <h4>{Header(props)}</h4>
    <div>
    {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={() => {back(EMPTY)}}
      />
    )}
    </div>
    </React.Fragment>
  );

}

/*  All Appointment components will render a Header that takes in a time prop.
If props.interview is truthy (an interview object) the Appointment will render
the <Show /> component, else it should render the <Empty /> component.*/
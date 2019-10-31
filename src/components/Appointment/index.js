import React from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  return interview
}
  return (
    <React.Fragment>
    <h4>{Header(props)}</h4>
    <div>
    {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
    {mode === SAVE && <Status message="Saving"/>}
    {mode === DELETE && <Status message="Deleting"/>}
    {mode === CONFIRM && (
      <Confirm 
        interview={props.interview} 
        onCancel={() => transition(SHOW)} 
        onConfirm={(interview) => {
          transition(DELETE)
          props.cancelInterview(props.id, interview).then(() =>
          transition(EMPTY)
          )} 
        }
      />
    )}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => {
          transition(CONFIRM)
        }}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={() => {back(EMPTY)}}
        onSave={(name, interviewer) => {
          transition(SAVE)
          props.bookInterview(props.id, save(name, interviewer)).then(() => 
          transition(SHOW)
          )
        }}
      />
    )}
    </div>
    </React.Fragment>
  );
}

/*  All Appointment components will render a Header that takes in a time prop.
If props.interview is truthy (an interview object) the Appointment will render
the <Show /> component, else it should render the <Empty /> component.*/
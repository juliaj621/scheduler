import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, number) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props
      .bookInterview(props.id, interview, number)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  function destroy(event) {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  return (
    <React.Fragment>
      <article data-testid="appointment">
        {/* className="appointment" */}
        <h4>{Header(props)}</h4>
        <div>
          {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
          {mode === SAVE && <Status message="Saving" />}
          {mode === DELETE && <Status message="Deleting" />}
          {mode === CONFIRM && (
            <Confirm
              interview={props.interview}
              message="Are you sure you want to delete?"
              onCancel={() => transition(SHOW)}
              onConfirm={(interview) => {
                destroy()
              }}
            />
          )}
          {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete={() => {
                transition(CONFIRM)
              }}
              onEdit={() => {
                transition(EDIT)
              }}
            />
          )}
          {mode === CREATE && (
            <Form
              interviewers={props.interviewers}
              onCancel={() => { back(EMPTY) }}
              onSave={(name, interviewer) => {
                save(name, interviewer, -1)
              }}
            />
          )}
          {mode === EDIT && (
            <Form
              interviewers={props.interviewers}
              name={props.interview.student}
              interviewer={props.interview.interviewer.id}
              onCancel={() => { back(SHOW) }}
              onSave={(name, interviewer) => {
                save(name, interviewer, 0)
              }}
            />
          )}
          {mode === ERROR_SAVE && (
            <Error
              message="Could not save appointment"
              onClose={() => { back() }}
            />
          )}
          {mode === ERROR_DELETE && (
            <Error
              message="Could not cancel appointment"
              onClose={() => { back() }}
            />
          )}
        </div>
      </article>
    </React.Fragment>
  );
};
import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { restElement } from '@babel/types';

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewerId, setInterviewer] = useState(props.interviewer || null);
  const cancel = () => {
    reset()
    props.onCancel()
  }
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={e => setName(e.target.value)}

          />
        </form> 
        <InterviewerList interviewers={props.interviewers} interviewer={interviewerId} setInterviewer={id => setInterviewer(id)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => props.onSave(name, interviewerId)}>Save</Button>
        </section>
      </section>
    </main>
  );

}
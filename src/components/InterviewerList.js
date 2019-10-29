import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss";
import classNames from "classnames";


export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      id={interviewer.id}
      avatar={interviewer.avatar} 
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer} />
    );
    
    // onClick={() => props.setInterviewer(props.name)}

  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list" >{interviewers}</ul>
    </section>
  );
}
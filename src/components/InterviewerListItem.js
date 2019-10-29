import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item",{
    "interviewers__item--selected": props.selected,
  });
  
  const interviewerClassImage = classNames("interviewers__item-image", {
    "interviewers__item-image--selected" : props.selected
  })

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className={interviewerClassImage}
      src={props.avatar} 
      alt="Sylvia Palmer"
    />
    {props.selected && props.name}
  </li>
  );
}
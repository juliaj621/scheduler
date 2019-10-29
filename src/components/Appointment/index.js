import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";


export default function Appointment(props) {

  return (
    <React.Fragment>
    <h4>{Header(props)}</h4>
    <div>{(props.interview ? Show(props.interview): Empty(props))}</div>
    </React.Fragment>
  );

}

/*  All Appointment components will render a Header that takes in a time prop.
If props.interview is truthy (an interview object) the Appointment will render
the <Show /> component, else it should render the <Empty /> component.*/
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const StudentSubjectSelect = (props)=>{
  return (
    <div>
    <select value={props.value} onChange={(event)=>{
        props.subject_subject[props.index] = event.target.value
        return props.parent.handleInputChange({subject_subject:props.subject_subject})
      }}>
      {
          props.parent.state.available_subject.map((s,index)=>
            (!props.subject_subject.includes(s.subject_id))?
            <option key={s.subject_id} value={s.subject_id}>{s.subject_description+" - "+s.subject_teacher}</option>
            :<option key={s.subject_id} value={s.subject_id} disabled>{s.subject_description+" - "+s.subject_teacher}</option>
          )
      }
      {(()=>{
        if(props.value==""){
          props.parent.state.available_subject.forEach((item,index,array)=>{
            if(!props.subject_subject.includes(item.subject_id)){
              props.subject_subject[props.index] = item.subject_id
              props.parent.handleInputChange({subject_subject:props.subject_subject})
            }
          });
        }
      }
      )()}
    </select>
    <button onClick={(event)=>{
      props.subject_subject.splice(props.index, 1);
      props.parent.handleInputChange({subject_subject:props.subject_subject});
      event.preventDefault();
    }}>
        x
    </button>
    </div>
  )
}
export {StudentSubjectSelect}

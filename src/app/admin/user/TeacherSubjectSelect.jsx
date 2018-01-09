import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const TeacherSubjectSelect = (props)=>{
  return (
    <div>
    <select required value={props.value} onChange={(event)=>{
        props.subject_subject[props.index] = event.target.value
        return props.parent.handleInputChange({subject_subject:props.subject_subject})
      }}>
      <option value="" disabled></option>
      {
          props.parent.state.subject.map((s,index)=>
            (!props.subject_subject.includes(s.id))?
            <option key={s.id} value={s.id}>{s.description}</option>
            :<option key={s.id} value={s.id} disabled>{s.description}</option>
          )
      }
      {(()=>{
        if(props.value==""){
          props.parent.state.subject.forEach((item,index,array)=>{
            if(!props.subject_subject.includes(item.id)){
              props.subject_subject[props.index] = item.id
              props.parent.handleInputChange({subject_subject:props.subject_subject})
            }
          });
        }
      }
      )()}
    </select>
    <button type="button" className="btn btn-outline-dark"  onClick={(event)=>{
      props.subject_subject.splice(props.index, 1);
      props.parent.handleInputChange({subject_subject:props.subject_subject});
      event.preventDefault();
    }}>
        x
    </button>
    </div>
  )
}
export {TeacherSubjectSelect}

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const ExamTable = (props)=>{
  const items = props.parent.state.exams.map((q,index)=>
        (
    <tr key={q.exam_id}>
      <td className={"text-center"}>{index+1}</td>
      <td className={"text-center"}>{q.exam_description}</td>
      <td className={"text-center"}>{q.exam_type_description}</td>
      <td className={"text-center"}>{q.exam_subject_description}</td>
      <td className={"text-center"}>{q.exam_teacher_name}</td>
      <td className={"text-center"}>{q.exam_date_start}</td>
      <td className={"text-center"}>{q.exam_date_end}</td>
      <td className={"text-center"}>{q.exam_duration+" minutes"}</td>
      <td className={"text-center"}>
        <button type="button" className="btn btn-outline-dark" 
          onClick={(event)=>{
            return props.parent.handleExamUpdateButton(q);
          }}
          >
            Update
        </button>
        <button type="button" className="btn btn-outline-dark" 
          onClick={(event)=>{
            props.parent.handleExamDeleteButton(q.exam_id);
          }}
          >
            Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <button type="button" className="btn btn-outline-dark" 
        onClick={
          (event)=>{
            props.parent.setState({exam_state_type:"Add",question_state_type:"View"})
          }
        }
      >Add Exam</button>
    <table className={"table"}>
      <tr>
        <th className={"text-center"}>#</th>
        <th className={"text-center"}>Description</th>
        <th className={"text-center"}>Exam Type</th>
        <th className={"text-center"}>Subject</th>
        <th className={"text-center"}>Teacher</th>
        <th className={"text-center"}>Date Available</th>
        <th className={"text-center"}>Date Expire</th>
        <th className={"text-center"}>Duration</th>
        <th className={"text-center"}>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {ExamTable}

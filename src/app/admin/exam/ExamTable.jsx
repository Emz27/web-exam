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
      <td>{index+1}</td>
      <td>{q.exam_description}</td>
      <td>{q.exam_type_description}</td>
      <td>{q.exam_subject_description}</td>
      <td>{q.exam_teacher_name}</td>
      <td>{q.exam_date_start}</td>
      <td>{q.exam_date_end}</td>
      <td>{q.exam_duration+" minutes"}</td>
      <td>
        <button
          onClick={(event)=>{
            return props.parent.handleExamUpdateButton(q);
          }}
          >
            Update
        </button>
        <button
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
      <button
        onClick={
          (event)=>{
            props.parent.setState({exam_state_type:"Add",question_state_type:"View"})
          }
        }
      >Add Exam</button>
    <table>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Exam Type</th>
        <th>Subject</th>
        <th>Teacher</th>
        <th>Date Available</th>
        <th>Date Expire</th>
        <th>Duration</th>
        <th>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {ExamTable}

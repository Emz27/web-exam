import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const ExamTable = (props)=>{
  const items = props.parent.state.exams.filter((item)=>{
          if(props.parent.state.exam_exams.some((i)=>i.question_id == item.question_id))return false;
          return true;
        }).map((q,index)=>
        (
    <tr key={q.exam_id}>
      <td>{index+1}</td>
      <td>{q.exam_description}</td>
      <td>{q.exam_type_description}</td>
      <td>{q.teacher_name}</td>
      <td>{q.date_start}</td>
      <td>{q.date_end}</td>
      <td>{q.duration}</td>
      <td>{q.total_item}</td>
      <td>{q.total_point}</td>
      <td>
        <button
          onClick={(event)=>{
            props.parent.handleExamUpdateButton(q);
          }}
          >
            Update
        </button>
        <button
          onClick={(event)=>{
            props.parent.handleExamDeleteButton(q.question_id);
          }}
          >
            Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <table>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Exam Type</th>
        <th>Teacher</th>
        <th>Date Available</th>
        <th>Date Expire</th>
        <th>Duration</th>
        <th>Total Items</th>
        <th>Total Points</th>
        <th>Action</th>
      </tr>
      {
        items
      }
    </table>
  )
}
export {ExamTable}

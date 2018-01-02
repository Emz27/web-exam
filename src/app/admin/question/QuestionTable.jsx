import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'



const QuestionTable = (props)=>{
  const items = props.parent.state.questions.map((q,index)=>(
    <tr key={q.id}>
      <td>{index+1}</td>
      <td>{q.description}</td>
      <td>{q.subject_description}</td>
      <td>{q.teacher_name}</td>
      <td>{q.question_type_description}</td>
      <td>{q.exam_type_description}</td>
      <td>{q.point}</td>
      <td>{q.question_options.length}</td>
      <td>
        <button
          onClick={(event)=>{
            props.parent.handleUpdateButton(q);
          }}
          >
            Update
        </button>
        <button
          onClick={(event)=>{
            props.parent.handleDeleteButton(q.id);
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
        <th>Subject</th>
        <th>Author</th>
        <th>Type</th>
        <th>Exam Type</th>
        <th>Points</th>
        <th># Options</th>
        <th>Action</th>
      </tr>
      {
        items
      }
    </table>
  )
}
export {QuestionTable}

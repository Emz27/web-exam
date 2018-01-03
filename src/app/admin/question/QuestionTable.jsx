import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'



const QuestionTable = (props)=>{
  const items = props.parent.state.questions.filter((item)=>{
          if(props.parent.state.exam_questions.some((i)=>i.question_id == item.question_id))return false;
          return true;
        }).map((q,index)=>
        (
    <tr key={q.question_id}>
      {
        <Route path={props.match.url+"/exams"} render={()=>{
            return (
              <td>
              <button
                onClick={
                  (event)=>{
                    props.parent.setState({
                      exam_questions: [...props.parent.state.exam_questions,{...q}],
                    })
                  }
                }>
                +
              </button>
              </td>
            )
          }
        } />
      }
      <td>{index+1}</td>
      <td>{q.question_description}</td>
      <td>{q.subject_description}</td>
      <td>{q.teacher_name}</td>
      <td>{q.question_type_description}</td>
      <td>{q.exam_type_description}</td>
      <td>{q.point}</td>
      <td>{q.question_options.length}</td>
      <td>
        <button
          onClick={(event)=>{
            props.parent.handleQuestionUpdateButton(q);
          }}
          >
            Update
        </button>
        <button
          onClick={(event)=>{
            props.parent.handleQuestionDeleteButton(q.question_id);
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
        <Route path={props.match.url+"/exams"} render={()=><th> </th>} />
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

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
          if(props.parent.state.exam_state_type
            &&props.parent.state.exam_state_type!="View"
            &&props.parent.state.exam_subject_description != item.question_subject_description){
            return false;
          }
          return true;
        }).map((q,index)=>
        (
    <tr key={q.question_id}>
      {
        <Route path={"/teacher/exams"} render={()=>{
            return (
              <td className={"text-center"}>
              <button type="button" className="btn btn-outline-dark"
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
      <td className={"text-center"}>{index+1}</td>
      <td className={"text-center"}>{q.question_description}</td>
      <td className={"text-center"}>{q.question_subject_description}</td>
      <td className={"text-center"}>{q.question_teacher_name}</td>
      <td className={"text-center"}>{q.question_type_description}</td>
      <td className={"text-center"}>{q.question_point}</td>
      <td className={"text-center"}>{q.question_options.length}</td>
      <td className={"text-center"}>
        <button type="button" className="btn btn-outline-dark"
          onClick={(event)=>{
            props.parent.handleQuestionUpdateButton(q);
          }}
          >
            Update
        </button>
        <button type="button" className="btn btn-outline-dark"
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
    <table className={"table"}>
      <tr>
        <Route path={props.match.url+"/exams"} render={()=><th className={"text-center"}> </th>} />
        <th className={"text-center"}>#</th>
        <th className={"text-center"}>Description</th>
        <th className={"text-center"}>Subject</th>
        <th className={"text-center"}>Author</th>
        <th className={"text-center"}>Type</th>
        <th className={"text-center"}>Points</th>
        <th className={"text-center"}># Options</th>
        <th className={"text-center"}>Action</th>
      </tr>
      {
        items
      }
    </table>
  )
}
export {QuestionTable}

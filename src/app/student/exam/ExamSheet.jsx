import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'
import {QuestionItem} from './QuestionItem.jsx'

const ExamSheet = (props)=>{
  const present_exam = props.parent.state.student_present_exams.find(e => e.exam_id == props.parent.props.match.params.exam_id);
  if(!present_exam) return (<div>Exam not found</div>)
  if(!present_exam.exam_questions[0].student_answers.length){
    console.log("no answers");
    console.dir(present_exam);
    $.post({
      url:"../../api/student_exam/student_answer_add.php",
      data:{
        exam_id:present_exam.exam_id
      }
    })
    .done((data)=>{
      props.parent.fetch()
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    })
  }
  var index=0;
  var question_type="";
  const items = present_exam.exam_questions.map((q,i)=>
                {
                  return(
                  <li key={q.question_id}>
                    {
                      (()=>{
                        if(question_type != q.question_type_description){
                          question_type = q.question_type_description
                          return (
                            <b>{question_type}</b>
                          )
                        }
                      })()
                    }
                    <div>
                      {
                        (()=>{
                          if(q.question_type_description == "Multiple Choice" || q.question_type_description == "True or False"){

                            return (
                              <div>
                                {(()=>{index=index+1})()}
                                {index+". "+q.question_description}
                                <ul>
                                {q.question_options.map((o,idx)=>{
                                  return (
                                    <li key={o.id}>
                                      <label>
                                        <input type="radio" name={o.id}
                                           value={o.description}
                                           checked={q.student_answers.length && (o.description == q.student_answers[0].answer)}
                                           onClick={(event)=>props.parent.handleInputChange({
                                                                                answer:o.description,
                                                                                id:q.student_answers[0].id,
                                                                                date_created:q.student_answers[0].date_created,
                                                                                duration:present_exam.exam_duration
                                                                              })}
                                           />
                                        {" "+o.description}
                                      </label>
                                    </li>
                                  )
                                })}
                                </ul>
                              </div>)
                          }
                          else if(q.question_type_description == "Enumeration"){

                            return (
                              <div>
                              {q.question_description}
                              <ul>
                              {
                                q.student_answers.map((a,idx)=>{
                                  return (
                                    <li key={a.id}>
                                      {(()=>{index=index+1})()}
                                      <label>
                                        {index+". "}
                                        <input type="text"
                                           defaultValue={a.answer}
                                           onBlur={(event)=>props.parent.handleInputChange({
                                                                            answer:event.target.value,
                                                                            id:a.id,
                                                                            date_created:a.date_created,
                                                                            duration:present_exam.exam_duration
                                                                          })}
                                           />
                                      </label>
                                    </li>
                                  )
                                })
                              }
                              </ul>
                              </div>)
                          }
                          else if(q.question_type_description == "Identification"){
                            return (
                              <div>
                              {(()=>{index=index+1})()}
                              {index+". "+q.question_description}
                              <ul>
                              {
                                q.student_answers.map((a,idx)=>{
                                  return (
                                    <li key={a.id}>

                                      <label>
                                        <input type="text"
                                           defaultValue={a.answer}
                                           onBlur={(event)=>props.parent.handleInputChange({
                                                                            answer:event.target.value,
                                                                            id:a.id,
                                                                            date_created:a.date_created,
                                                                            duration:present_exam.exam_duration
                                                                          })}
                                           />
                                      </label>
                                    </li>
                                  )
                                })
                              }
                              </ul>
                              </div>)
                          }
                        })()
                      }
                    </div>
                  </li>
                  )
                }
              );
  return (
    <div className="col">
      {items}
    </div>
  )
}
export {ExamSheet}

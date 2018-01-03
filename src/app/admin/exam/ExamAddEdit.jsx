import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {fetchQuestion} from './../fetch.jsx'

const ExamAddEdit =(props)=>(

<div>
  <form onSubmit={(event)=>{props.parent.handleExamSubmitButton(event);}}>
    <div>
      <label>
        Subject
        {(()=>{
            if(props.parent.state.exam_state_type=="Add"){
              return (
                <select value={props.parent.state.teacher_subject_id}
                  onChange={(event)=>{
                    props.parent.handleInputChange({
                      teacher_subject_id: event.target.value
                    })
                    props.parent.setState({
                      fetch_filter:  ` where teacher_subject.id='${event.target.value}' `
                    })
                    fetchQuestion(props.parent);
                    props.parent.setState({
                      fetch_filter: ""
                    })
                  }}>
                  <option value="" disabled></option>
                  {props.parent.state.available_subjects.map((q,i)=><option key={q.teacher_subject_id} value={q.teacher_subject_id}>{q.subject_description+" - "+q.teacher_name}</option>)}
                </select>
              )
            }
            else return (<div>{props.parent.state.subject_description+" - "+props.parent.state.teacher_name}</div>)
        })()}
      </label>
    </div>
    <div>
      <label>
        Exam Type
        {(()=>{
        return (
          <select value={props.parent.state.exam_type_id} onChange={(event)=>{props.parent.handleInputChange({exam_type_id: event.target.value})}}>
            <option value="" disabled></option>
            {props.parent.state.exam_types.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
          </select>
        )
        })()}
      </label>
    </div>
    <div>
      <label>Available Date</label>
      <input type="datetime-local" value={props.parent.state.date_start}
        onChange={(event)=>{console.log(event.target.value);props.parent.handleInputChange({date_start: event.target.value})}}
        max={props.parent.state.date_end}
        required
      />
    </div>
    <div>
      <label>Expiry Date</label>
      <input type="datetime-local" value={props.parent.state.date_end}
        onChange={(event)=>{console.log(event.target.value);props.parent.handleInputChange({date_end: event.target.value})}}
        min={props.parent.state.date_start}
        required
      />
    </div>
    <div>
      <label>Duration (in minutes) </label>
      {()=>{
          if(!props.parent.state.duration)props.parent.handleInputChange({duration: 5});
        }}
      <input type="number" value={props.parent.state.duration}
        onChange={(event)=>{
          if(event.target.value >0)props.parent.handleInputChange({duration: event.target.value})
        }}
        min={5}
        max={120}
        required
      />
    </div>
    <button onClick={(event)=>{props.parent.handleExamCancelButton(event);}}>
        Cancel
    </button>
    <button type="submit">
        Submit Exam
    </button>
  </form>
</div>
)

export {ExamAddEdit}

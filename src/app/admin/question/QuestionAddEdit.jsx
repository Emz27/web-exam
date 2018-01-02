import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {MultipleChoice} from './MultipleChoice.jsx'
import {Enumeration} from './Enumeration.jsx'
import {Identification} from './Identification.jsx'
import {TrueFalse} from './TrueFalse.jsx'

const QuestionAddEdit =(props)=>(

<div>
  <form>
    <div>
      <label>
        Question Type
        {(()=>{
            if(props.parent.state.state_type=="Add"){
              return (
                <select value={props.parent.state.question_type_id}
                  onChange={(event)=>{
                    var description = props.parent.state.question_types.find(o => o.id == event.target.value).description;
                    var question_options =[];
                    if(description == "True or False"){
                      question_options.push({description: "true",is_correct: 1});
                      question_options.push({description: "false",is_correct: 0});
                    }
                    props.parent.handleInputChange({
                      question_type_id: event.target.value,
                      question_type_description: description,
                      question_options: question_options
                    })
                  }}>
                  <option value="" disabled></option>
                  {props.parent.state.question_types.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
                </select>
              )
            }
            else return (<div>{props.parent.state.question_type_description}</div>)
        })()}
      </label>
    </div>
    <div>
      <label>Description </label>
      <input type="text" placeholder="Description" value={props.parent.state.description}
        onChange={(event)=>{props.parent.handleInputChange({description: event.target.value})}}
      />
    </div>
    <div>
      <label>
        Subject
        {(()=>{
        // if(props.parent.state.subject_id==""){props.parent.state.subjects.some((item,index,array)=>{return props.parent.setState({subject_id:item.id})});}
        return (
          <select value={props.parent.state.subject_id} onChange={(event)=>{props.parent.handleInputChange({subject_id: event.target.value})}}>
            <option value="" disabled></option>
            {props.parent.state.subjects.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
          </select>
        )
        })()}
      </label>
    </div>
    <div>
      <label>
        Author
        {(()=>{
        return (
          <select value={props.parent.state.teacher_id} onChange={(event)=>{props.parent.handleInputChange({teacher_id: event.target.value})}}>
            <option value="" disabled></option>
            {props.parent.state.teachers.map((q,i)=><option key={q.id} value={q.id}>{q.teacher_name}</option>)}
          </select>
        )
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
      <label>Point </label>
      {()=>{
          if(!props.parent.state.point)props.parent.handleInputChange({point: 1});
        }}
      <input type="number" value={props.parent.state.point}
        onChange={(event)=>{
          if(event.target.value >0)props.parent.handleInputChange({point: event.target.value})
        }}
      />
    </div>
    <div>
      <label>
        Choices
        {
          (()=>{
            var type_description = props.parent.state.question_type_description;
            var input;
            if(type_description == "Multiple Choice"){
              input = props.parent.state.question_options.map((item,index)=>
                <MultipleChoice key={item.id} parent={props.parent} value={item.description} index={index} question_options={props.parent.state.question_options.slice()} />
              )
            }
            else if(type_description == "Identification"){
              input = props.parent.state.question_options.map((item,index)=>
                <Identification key={item.id} parent={props.parent} value={item.description} index={index} question_options={props.parent.state.question_options.slice()} />
              )
            }
            else if(type_description == "Enumeration"){
              input = props.parent.state.question_options.map((item,index)=>
                <Enumeration key={item.id} parent={props.parent} value={item.description} index={index} question_options={props.parent.state.question_options.slice()} />
              )
            }
            else if(type_description == "True or False"){
              input = props.parent.state.question_options.map((item,index)=>
                <TrueFalse key={item.id} parent={props.parent} value={item.description} index={index} question_options={props.parent.state.question_options.slice()} />
              )
            }
            return (
              <div>
                {input}
                <button onClick={(event)=>{
                  event.preventDefault();
                  var add={
                    description:"",
                    is_correct:"0",
                  };
                  if(type_description == "True or False")return;
                  if(type_description == "Identification" || type_description == "Enumeration"){add.is_correct = "1"}
                  if(+props.parent.state.option_limit != 0){
                    var limit = +props.parent.state.option_limit;
                    if(props.parent.state.question_options.length <= limit){
                      props.parent.handleInputChange({question_options:[...props.parent.state.question_options,add]});
                    }
                  }
                  else props.parent.handleInputChange({question_options:[...props.parent.state.question_options,add]});
                  }}>
                    +
                </button>
              </div>
            )
          })()
        }
        {

        }
      </label>
    </div>
    <button onClick={(event)=>{props.parent.handleCancelButton(event);}}>
        Cancel
    </button>
    <button type="submit" onClick={(event)=>{props.parent.handleSubmitButton(event);}}>
        Submit
    </button>
  </form>
</div>
)

export {QuestionAddEdit}

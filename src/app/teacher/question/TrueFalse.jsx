import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const TrueFalse = (props)=>{
  return (
    <div>
    <div>
      <label>
      {props.value}
      <input
        name={props.value} type="checkbox" checked={+(props.question_options[props.index].is_correct)?true:false}
        onChange={
          (event)=>{
            if(event.target.checked){
              props.question_options[props.index].is_correct = "1"
              if(0 == props.index)props.question_options[1].is_correct = "0"
              else props.question_options[0].is_correct = "0"
              props.parent.handleInputChange({question_options: props.question_options})
            }
          }
        }
      />
      </label>
    </div>
    </div>
  )
}
export {TrueFalse}

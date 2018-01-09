import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const Enumeration = (props)=>{
  return (
    <div>
    <div>
      <label>
      <input type="text" value={props.value}
        onChange={(event)=>{
          event.preventDefault();
          props.question_options[props.index].description = event.target.value
          props.parent.handleInputChange({question_options: props.question_options})
        }}
      />
      </label>
    </div>
    <button type="button" className="btn btn-outline-dark"  onClick={(event)=>{
      event.preventDefault()
      props.question_options.splice(props.index, 1)
      props.parent.handleInputChange({question_options:props.question_options})
    }}>x</button>
    </div>
  )
}

export {Enumeration}

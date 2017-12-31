import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class QuestionPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        {'Question'}
      </div>
    )
  }
}


export default QuestionPage

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class ExamPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        {'Exam'}
      </div>
    )
  }
}


export default ExamPage

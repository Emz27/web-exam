import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class DepartmentPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        {'Department'}
      </div>
    )
  }
}


export default DepartmentPage

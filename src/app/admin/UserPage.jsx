import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class UserPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        {'User'}
      </div>
    )
  }
}


export default UserPage

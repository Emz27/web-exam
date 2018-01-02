import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class HomePage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        {'Home'}
      </div>
    )
  }
}


export {HomePage}

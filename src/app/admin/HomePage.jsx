import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class HomePage extends React.Component{
  render(){
    return (
      <div>
        Progress: 60% as of 4:30 AM January 4, 2018<br/>
        Features:<br/>
          #Account System<br/>
          - username and password credentials are required to use the service<br/>
          #Admin System<br/>
          - create/update/delete/view user,subject,department,question,exam data<br/>

        Work in progress features:<br/>
          - student incoming exam table<br/>
          - student examination sheet<br/>
          - student exam history<br/>
      </div>
    )
  }
}


export {HomePage}

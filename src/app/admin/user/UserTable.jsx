import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const UserTable = (props)=>{
  var items = props.parent.state.users.map((user,index)=>(
    <tr key={user.id}>
      <td>{index+1}</td>
      <td>{`${user.firstname} ${user.middlename} ${user.lastname}`}</td>
      <td>{user.type_description}</td>
      <td>{user.username}</td>
      <td>
        <button
          onClick={(event)=>{
            props.parent.handleUpdateButton(user);
          }}
          >
            Update
        </button>
        <button
          onClick={(event)=>{
            props.parent.handleDeleteButton(user.id);
          }}
          >
            Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
    <table>
      <tr>
        <th>#</th><th>Name</th><th>Type</th><th>Username</th><th>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}

export {UserTable}

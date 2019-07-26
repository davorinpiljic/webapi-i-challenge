import React from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText, 
  ListGroup, 
  ListGroupItem } from 'reactstrap';

import axios from 'axios'
  
export default class App extends React.Component { 
  constructor() {
    super()
    this.state = {
      users: [],
      newUser: {
        name: '',
        bio: '',
      }
    }
  }


componentDidMount() { 
  axios
    .get('http://localhost:8000/api/users')
    .then(response => {
      this.setState({users: response.data})
      console.log(this.state.users)
    })
  }

 deleteUser(user) {
   axios
   .delete(`http://localhost:8000/api/users/${user.id}`, user)
   .then(response => {
     this.componentDidMount()
   })
 } 

 addUser(user) {
   axios
   .post(`http://localhost:8000/api/users`, user)
   .then(users => {
    console.log(users)
  })
 }

 handleChange = (event) => {
   this.setState({
    newUser: {...this.state.newUser, [event.target.name]: event.target.value}})
 }

  render() {

    return(<div className="App">
      <br></br>
      <div>
      <ListGroup>{this.state.users.map(user => {
        return(<div><ListGroupItem color="primary">{user.name} <Button onClick={(event) => {
          this.deleteUser(user)
        }}close />
        </ListGroupItem> 
        <ListGroupItem color="secondary">{user.bio}</ListGroupItem></div>
        )
      })}
      </ListGroup></div>
      <br></br>
      <Form>
        <Label size="lg">Name</Label>
        <Input placeholder="name" bsSize="lg" 
         name="name"
          onChange={this.handleChange}
          value={this.state.newUser.name}/>
        <Label size="lg">Bio</Label>
        <Input placeholder="bio" bsSize="lg" 
         name="bio"
          onChange={this.handleChange}
          value={this.state.newUser.bio}/>
        <br></br>
        <Button color="primary" onClick={(event) => {this.addUser(this.state.newUser)}}>Add New User</Button>
      </Form>
    </div>
    )
  }
}


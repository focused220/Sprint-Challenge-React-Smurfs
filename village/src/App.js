import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Route, NavLink} from 'react-router-dom'
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Link from 'react-router-dom/Link';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount(){
    axios.get('http://localhost:3333/smurfs')
    .then(res => { 
      return(
        this.setState({smurfs: res.data})
      )})
  }

  nextID = () => {
    let id = this.state.smurfs.length + 1;
    return id;
  }

  updateSmurfs = (smurf) => {
    this.setState(prevState => {
      return({smurfs: [...prevState.smurfs, smurf]})
    })
  }
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
      <nav className='links'>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink exact to='/smurf-form'>Smurf Form</NavLink>
      </nav>
        <Route path='/smurf-form'><SmurfForm update={this.updateSmurfs} id={this.nextID}/></Route>
        <Route path='/'><Smurfs smurfs={this.state.smurfs} /></Route>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      age: '',
      height: ''
    };
    console.log(props)
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    let newSmurf = {
      id: this.props.id,
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,
    }

    Axios.post('http://localhost:3333/smurfs', newSmurf).then((res) => {
      console.log(res.data)
      return(
        this.setState({
          name: '',
          age: '',
          height: '',
        }        
        )
      )
    }).catch((err) => console.log(err))
    this.props.update(newSmurf)
    
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;

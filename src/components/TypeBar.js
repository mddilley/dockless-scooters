import React, { Component } from 'react'
import { Navbar, Form, FormControl } from 'react-bootstrap'

class TypeBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: "",
    }
  }

  handleChange = (event) => {
    const state = {}
    state[event.target.placeholder] = event.target.value
    this.setState(state)
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>{this.props.type} Dockless Type</Navbar.Brand>
          <Form inline>
          <FormControl onChange={this.handleChange} as="select">
            <option>All</option>
            <option>Scooter</option>
            <option>Bike</option>
          </FormControl>
          </Form>
      </Navbar>
    )
  }
}

export default TypeBar;

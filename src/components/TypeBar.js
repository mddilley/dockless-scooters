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
    const state = {};
    state["type"] = event.target.value;
    this.setState(state, () => {
      this.props.setType(this.state.type);
    });
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>Dockless Type</Navbar.Brand>
          <Form inline>
            <FormControl onChange={this.handleChange} as="select">
              <option>All</option>
              <option>Scooter</option>
              <option>Bicycle</option>
              </FormControl>
          </Form>
      </Navbar>
    )
  }
}

export default TypeBar;

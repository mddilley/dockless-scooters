import React, { Component } from 'react'
import { Navbar, Form, FormControl } from 'react-bootstrap'

class DateBar extends Component {

  handleChange = (event) => {
    const date = {};
    date[event.target.placeholder] = event.target.value;
    this.props.updateDateRange(date);
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>Dockless Usage</Navbar.Brand>
          <Form inline>
            <FormControl defaultValue={this.props.startDate} onChange={this.handleChange} type="date" placeholder="startDate" className="mr-sm-2" />
              <span>to&nbsp;&nbsp;</span>
            <FormControl defaultValue={this.props.endDate} onChange={this.handleChange} type="date" placeholder="endDate" className="mr-sm-2" />
          </Form>
      </Navbar>
    )
  }
}

export default DateBar;

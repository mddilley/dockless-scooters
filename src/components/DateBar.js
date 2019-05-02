import React, { Component } from 'react'
import { Navbar, Form, FormControl, Button } from 'react-bootstrap'

class DateBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: "",
      endDate: "",
    }
  }

  handleChange = (event) => {
    const state = {}
    state[event.target.placeholder] = event.target.value
    this.setState(state)
  }

  filterClick = () => {
    this.props.updateDateRange(this.state)
  }

  clearClick = (event) => {
    event.preventDefault();
    event.target.reset();
    this.setState({
      startDate: "",
      endDate: "",
    })
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>{this.props.type} Dockless Usage {this.state.startDate} {this.state.endDate}</Navbar.Brand>
          <Form inline>
            <FormControl onSubmit={this.clearClick} onChange={this.handleChange} type="date" placeholder="startDate" className="mr-sm-2" />
              <span>to&nbsp;&nbsp;</span>
            <FormControl onChange={this.handleChange} type="date" placeholder="endDate" className="mr-sm-2" />
            <Button onClick={this.filterClick} className="btn btn-primary">Filter</Button>&nbsp;&nbsp;
            <Button type="submit" className="btn btn-danger">Clear</Button>
          </Form>
      </Navbar>
    )
  }
}

export default DateBar;

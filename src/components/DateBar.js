import React, { Component } from 'react'
import { Navbar, Form, FormControl, Button } from 'react-bootstrap'
let moment = require('moment');

class DateBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: "",
      endDate: "",
    }
  }

  handleChange = (event) => {
    const state = {};
    let time = moment();
    debugger
    state[event.target.placeholder] = event.target.value;
    this.setState(state);
  }

  filterClick = (event) => {
    event.preventDefault();
    this.props.updateDateRange(this.state);
  }

  clearClick = (event) => {
    event.preventDefault();
    event.target.reset();
    this.initDatePickers();
  }

  initDatePickers = () => {
    this.setState({
      startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    })
  }

  componentDidMount() {
    this.initDatePickers();
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>Dockless Usage</Navbar.Brand>
          <Form inline>
            <FormControl value={this.state.startDate} onSubmit={this.clearClick} onChange={this.handleChange} type="date" placeholder="startDate" className="mr-sm-2" />
              <span>to&nbsp;&nbsp;</span>
            <FormControl defaultValue={this.state.endDate} onChange={this.handleChange} type="date" placeholder="endDate" className="mr-sm-2" />
            <Button onClick={this.filterClick} className="btn btn-primary">Filter</Button>&nbsp;&nbsp;
            <Button type="submit" className="btn btn-danger">Clear</Button>
          </Form>
      </Navbar>
    )
  }
}

export default DateBar;

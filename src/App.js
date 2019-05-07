import React, { Component } from "react";
import "./App.css";
import Miles from './components/Miles'
import Trips from './components/Trips'
import UniqueUnits from './components/UniqueUnits'
import DateBar from './components/DateBar'
import TypeBar from './components/TypeBar'
import Duration from './components/Duration'
import { CardDeck, Container } from 'react-bootstrap'
import axios from "axios";
let moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      totalTrips: 0,
      totalMiles: 0,
      uniqueIdentified: 0,
      type: "All",
      startDate: `${moment().subtract(7, 'days').format('YYYY-MM-DD')}`,
      endDate: moment().format('YYYY-MM-DD'),
      avgTime: 0,
    };
  }

  calcTotalTrips = (trips) => {
    const totalTrips = trips.length;
    this.setState({totalTrips: totalTrips});
  }

  calcTotalMiles = (trips) => {
    let totalMeters = 0;
    trips.forEach(trip => {
      if(trip.trip_distance){
          totalMeters += parseInt(trip.trip_distance);
      }
    });
    const totalMiles = (totalMeters * 0.000621371).toFixed(2);
    this.setState({totalMiles: totalMiles});
  }

  calcUniqueIdentified = (trips) => {
    const array = trips.map(trip => parseInt(trip.trip_id));
    const uniqueIdentified = new Set(array).size;
    this.setState({uniqueIdentified: uniqueIdentified});
  }

  calcDuration = (trips) => {
    let totalSeconds = 0;
    trips.forEach(trip => {
      if(trip.trip_duration){
          totalSeconds += parseInt(trip.trip_duration);
      }
    });
    const avgMinutes = ((totalSeconds / 60) / this.state.totalTrips).toFixed(2)
    debugger
  }

  setStats = (trips) => {
    this.calcTotalTrips(trips);
    this.calcTotalMiles(trips);
    this.calcUniqueIdentified(trips);
    this.calcDuration(trips);
  }

  updateDateRange = (date) => {
    const updatedDate = date;
    this.setState( updatedDate, () => {
      this.getData();
    });
  }

  setType = (type) => {
    this.setState({type: type}, () => {
      this.getData();
    });
  }

  chooseIcon = () => {
    if(this.state.type === "Bicycle"){
      return <i className="fas fa-bicycle"></i>
    } else if (this.state.type === "Scooter") {
      return <i className="fas fa-bolt"></i>
    } else {
      return <i className="fas fa-globe"></i>
    }
  }

  getData = () => {
    let url = "";
    if(this.state.type === "All") {
      url = `https://data.austintexas.gov/resource/7d8e-dm7r.json` +
        `?$limit=5000000&$where=start_time between '${this.state.startDate}T00:00:01' and '${this.state.endDate}T11:59:59'`
    } else {
      url = `https://data.austintexas.gov/resource/7d8e-dm7r.json` +
        `?$limit=5000000&vehicle_type='${this.state.type.toLowerCase()}'&$where=start_time between '${this.state.startDate}T00:00:01' and '${this.state.endDate}T11:59:59'`
    }
    axios
      .get(url)
      .then(res => {
        const trips = res.data;
        this.setState({trips: trips});
        this.setStats(trips);
      });
  }

  componentDidMount() {
    // Here is a link to the API Documentation: https://dev.socrata.com/
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <h1>Dockless Vehicles ({this.state.type})</h1>
          <TypeBar setType={this.setType}/>
          <DateBar startDate={this.state.startDate} endDate={this.state.endDate} updateDateRange={this.updateDateRange}/>
          <br/>
          <Container>
            <CardDeck className="App-intro">
              <Trips total={this.state.totalTrips} icon={this.chooseIcon()}/>
              <Miles total={this.state.totalMiles} icon={this.chooseIcon()}/>
              <UniqueUnits total={this.state.uniqueIdentified} icon={this.chooseIcon()}/>
              <Duration total={this.state.avgTime} icon={this.chooseIcon()} />
            </CardDeck>
          </Container>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Miles from './components/Miles'
import Trips from './components/Trips'
import UniqueUnits from './components/UniqueUnits'
import DateBar from './components/DateBar'
import { CardDeck, Container } from 'react-bootstrap'

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      totalTrips: 0,
      totalMiles: 0,
      uniqueIdentified: 0,
      type: "All",
    };
  }

  calcTotalTrips = () => {
    const totalTrips = this.state.trips.length;
    this.setState({totalTrips: totalTrips})
  }

  calcTotalMiles = () => {
    let totalMeters = 0;
    this.state.trips.forEach(trip => {
      if(trip.trip_distance){
          totalMeters += parseInt(trip.trip_distance);
      }
    });
    const totalMiles = (totalMeters * 0.000621371).toFixed(2);
    this.setState({totalMiles: totalMiles})
  }

  calcUniqueIdentified = () => {
    const array = this.state.trips.map(trip => parseInt(trip.trip_id))
    const uniqueIdentified = new Set(array).size
    this.setState({uniqueIdentified: uniqueIdentified})
  }

  setTrips = (trips) => {
    this.setState({trips: trips}, () => {
      this.calcTotalTrips();
      this.calcTotalMiles();
      this.calcUniqueIdentified();
    })
  }

  updateDateRange = (dates) => {
    const filteredTrips = this.state.trips.filter(trip => {
      if(trip.start_time){
        const rideDate = new Date(trip.start_time.slice(0,10));
        return (rideDate >= new Date(dates.startDate) && rideDate <= new Date(dates.endDate))
      }
    });
    console.log(filteredTrips);
    this.setTrips(filteredTrips);
  }

  componentDidMount() {
    // Here is a link to the API Documentation: https://dev.socrata.com/
    axios
      .get("https://data.austintexas.gov/resource/7d8e-dm7r.json")
      .then(res => {
        const trips = res.data
        this.setTrips(trips);
      });
  }

  render() {
    return (
      <div className="App">
        <h2>Dockless Scooters</h2>

          <DateBar type={this.state.type} updateDateRange={this.updateDateRange}/>
          <br/>
          <Container>
            <CardDeck className="App-intro">
              <Miles total={this.state.totalMiles}/>
              <Trips total={this.state.totalTrips}/>
              <UniqueUnits total={this.state.uniqueIdentified}/>
            </CardDeck>
          </Container>
      </div>
    );
  }
}

export default App;

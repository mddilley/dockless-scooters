import React, { Component } from "react";
import "./App.css";
import Miles from './components/Miles'
import Trips from './components/Trips'
import UniqueUnits from './components/UniqueUnits'
import DateBar from './components/DateBar'
import TypeBar from './components/TypeBar'
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

  calcTotalTrips = (trips) => {
    const totalTrips = trips.length;
    this.setState({totalTrips: totalTrips})
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

  setStats = (trips) => {
    this.calcTotalTrips(trips);
    this.calcTotalMiles(trips);
    this.calcUniqueIdentified(trips);
  }

  updateDateRange = (dates) => {
    let filteredDateTrips = [];
    if(dates.endDate !== "" && dates.startDate !== ""){
      filteredDateTrips = this.state.trips.filter(trip => {
        if(trip.start_time){
          const rideDate = new Date(trip.start_time.slice(0,10));
          return (rideDate >= new Date(dates.startDate) && rideDate <= new Date(dates.endDate));
        } else {
          return false;
        }
      });
    } else {
      filteredDateTrips = this.state.trips;
    }
    if(this.state.type === "All") {
      this.setStats(filteredDateTrips);
    } else {
      const filteredTypeTrips = filteredDateTrips.filter(trip => {
        if(trip.vehicle_type){
          const vehicleType = trip.vehicle_type;
          return vehicleType.toLowerCase() === this.state.type.toLowerCase();
        } else {
          return false;
        }
      });
      this.setStats(filteredTypeTrips);
    }
  }

  setType = (type) => {
    this.setState({type: type})
  }

  chooseIcon = () => {
    if(this.state.type === "Bicycle"){
      return <i class="fas fa-bicycle"></i>
    } else if (this.state.type === "Scooter") {
      return <i class="fas fa-bolt"></i>
    } else {
      return <i class="fas fa-globe"></i>
    }
  }

  componentDidMount() {
    // Here is a link to the API Documentation: https://dev.socrata.com/
    axios
      .get("https://data.austintexas.gov/resource/7d8e-dm7r.json")
      .then(res => {
        const trips = res.data
        this.setState({trips: trips})
        this.setStats(trips);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Dockless Vehicles ({this.state.type})</h1>
          <TypeBar setType={this.setType}/>
          <DateBar updateDateRange={this.updateDateRange}/>
          <br/>
          <Container>
            <CardDeck className="App-intro">
              <Miles total={this.state.totalMiles} icon={this.chooseIcon()}/>
              <Trips total={this.state.totalTrips} icon={this.chooseIcon()}/>
              <UniqueUnits total={this.state.uniqueIdentified} icon={this.chooseIcon()}/>
            </CardDeck>
          </Container>
      </div>
    );
  }
}

export default App;

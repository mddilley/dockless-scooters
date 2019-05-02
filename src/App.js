import React, { Component } from "react";
import "./App.css";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      totalTrips: 0,
      totalMiles: 0,
      uniqueIdentified: 0,
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

  componentDidMount() {
    // Here is a link to the API Documentation: https://dev.socrata.com/
    axios
      .get("https://data.austintexas.gov/resource/7d8e-dm7r.json")
      .then(res => {
        const trips = res.data
        this.setState({ trips: trips })
        this.calcTotalTrips();
        this.calcTotalMiles();
        this.calcUniqueIdentified();
      });
  }

  render() {
    return (
      <div className="App">
        <h2>Dockless Scooters</h2>

        <p className="App-intro">
          {/* TODO: Display data here, maybe? Be creative! 🎉 */}
          Total Trips: {this.state.totalTrips}<br/>
          Total Miles: {this.state.totalMiles}<br/>
          Total Unique Units Identified: {this.state.uniqueIdentified}
        </p>
      </div>
    );
  }
}

export default App;

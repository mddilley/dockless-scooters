import React from 'react'
import { Card } from 'react-bootstrap'

function Trips(props) {
  return <Card style={{ width: '18rem' }}>
            <Card.Title className="card-title">
              Total Trips
            </Card.Title>
            <Card.Text className="card-text">
              {props.total} trips
            </Card.Text>
          </Card>
}

export default Trips;

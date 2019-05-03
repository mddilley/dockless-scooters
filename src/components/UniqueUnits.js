import React from 'react'
import { Card } from 'react-bootstrap'

function UniqueUnits(props) {
  return <Card className="text-left card" style={{ width: '18rem' }}>
            <Card.Title className="card-title">
              {props.icon} Unique Units Identified
            </Card.Title>
            <br/>
            <Card.Text className="card-text">
              {props.total} Unique Units
            </Card.Text>
          </Card>
}

export default UniqueUnits;

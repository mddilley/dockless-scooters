import React from 'react'
import { Card } from 'react-bootstrap'

function UniqueUnits(props) {
  return <Card style={{ width: '18rem' }}>
            <Card.Title className="card-title">
              Unique Units Identified
            </Card.Title>
            <Card.Text className="card-text">
              {props.total} Unique Units
            </Card.Text>
          </Card>
}

export default UniqueUnits;

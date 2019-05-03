import React from 'react'
import { Card } from 'react-bootstrap'

function Miles(props) {
  return <Card className="text-left card" style={{ width: '18rem' }}>
            <Card.Title className="card-title">
              Total Miles
            </Card.Title>
            <Card.Text className="card-text">
              {props.total} mi.
            </Card.Text>
          </Card>
}

export default Miles;

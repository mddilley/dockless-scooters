import React from 'react'
import { Card } from 'react-bootstrap'

function Duration(props) {
  return <Card className="text-left card" style={{ width: '18rem' }}>
            <Card.Title className="card-title">
              {props.icon} Average Duration
            </Card.Title>
            <br/>
            <Card.Text className="card-text">
              {props.total} min.
            </Card.Text>
          </Card>
}

export default Duration;

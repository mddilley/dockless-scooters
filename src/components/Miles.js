import React from 'react'
import { Card } from 'react-bootstrap'

function Miles(props) {
  return <Card style={{ width: '18rem' }}>
            <Card.Title>
              Total Miles
            </Card.Title>
            <Card.Text>
              {props.total} mi.
            </Card.Text>
          </Card>
}

export default Miles;

import logo from './logo.svg';
import './App.css';
import { Jumbotron, Container, Col, Row, Media, Nav, Navbar, Figure, Modal, Button, Card, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';

function App() {
  //State
  const [month, updateMonth] = useState([])
  const [eventList, updateEventList] = useState([])
  const [newEvent, updateNewEvent] = useState('')
  //Generates an empty April calendar upon loading the page
  useEffect(() => {
    function aprilGen() {
      const april = []
      const events = []
      for (let index = 1; index < 31; index++) {
        april.push(index)
        events.push({ date: index, events: [] })
      }
      console.log(april)
      console.log(events)
      updateMonth(april)
      updateEventList(events)
    }
    aprilGen()
    //Loads saved events from local storage to the calendar
    if (localStorage.getItem('events')) {
      const eventSaved = JSON.parse(localStorage.getItem("events") || "[]")
      console.log('this is local storage saved', eventSaved)
      updateEventList(eventSaved)
    }
  }, [])

  //Handles the input forms on each calendar day 
  function handleChange(event) {
    updateNewEvent(event.target.value)
  }
  //Handles the buttons on each calendar day
  function handleSubmit(indexFunc) {
    const indexCheck = Number(indexFunc)
    const newList = eventList.map((event, index) => {
      //generates a new calendar list with the new event added in
      if (indexCheck == index) {
        event.events.push(newEvent)
        return event
      } else {
        return event
      }
    })
    updateEventList(newList)
    // adds updated calendar to local storage
    if (localStorage) {
      localStorage.setItem('events', JSON.stringify(newList))
    }
    window.location.reload()
  }

  if (!eventList) {
    return null
  }
  return (
    <div className="App">
      <Container>
        <Row>

          <Col xs={15} className="d-flex flex-row flex-wrap">
            {month.map((day, index) => {
              return <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title> {`April ${index + 1}`}
                  </Card.Title>
                  <Form>
                    <Form.Group >
                      <Form.Control id={index} onChange={handleChange} placeholder="Add an event" />
                    </Form.Group>
                    <Button variant="primary" id={index} onClick={(event) =>
                      handleSubmit(event.target.id)}>
                      Submit
                    </Button>
                  </Form>
                  {eventList[index].events.map((event) => {
                    return <p style={{ color: "red" }}>{event}</p>
                  })}
                </Card.Body>
              </Card>
            })}
          </Col>

        </Row>
      </Container>
    </div >
  );
}

export default App;

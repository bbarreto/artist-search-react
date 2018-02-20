import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
          Container,
          Row,
          Col,
          Button,
          ListGroup,
          ListGroupItem
        } from 'reactstrap';


export default class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null
    }

    //load artist
    fetch('https://rest.bandsintown.com/artists/'+encodeURI(this.props.match.params.name)+'?app_id=a', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()
     ).then((responseJson) => {
      this.setState({artist: responseJson});
    }).catch(err => {
      console.log(err);
      this.setState({artist: 404});
    });
  }

  render() {
    if (this.state.artist===null) return (<Container className="py-5 text-center">Loading...</Container>);

    return (
      <Container className="py-5">
        <Row className="pb-4">
          <Col>
            <h1>{this.state.artist.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={{size: 4}}>
            <img alt={this.state.artist.name} src={this.state.artist.image_url} className="img-fluid" />
            {this.state.artist.facebook_page_url?<Button className="mt-3" block tag="a" target="_blank" href={this.state.artist.facebook_page_url}>See artist page on Facebook</Button>:''}
          </Col>
          <Col>
            <h2>Next events:</h2>
            <EventList artist={this.state.artist} />
          </Col>
        </Row>
      </Container>
    );
  }
}



class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.artist,
      events: null
    }

    //load events
    fetch('https://rest.bandsintown.com/artists/'+encodeURI(this.props.artist.name)+'/events?app_id=a', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()
     ).then((responseJson) => {
      this.setState({events: responseJson});
    }).catch(err => {
      console.log(err);
      this.setState({events: 404});
    });

  }

  render() {
    if (this.state.events === null) return (<Container className="py-5 text-center">Loading events list...</Container>);

    return (
      <ListGroup>
        {this.state.events.map((event, index) => {
            return (
              <ListGroupItem>
                <small><Moment format="MMM Do, h:mm a">{event.datetime}</Moment></small><br />
                <strong>{event.venue.name}</strong> ({event.venue.city}, {event.venue.country})
              </ListGroupItem>
            );
        })}
      </ListGroup>
    );
  }

}

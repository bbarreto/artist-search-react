import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
          Container,
          Row,
          Col,
          Button,
          Form,
          InputGroup,
          InputGroupAddon,
          Input,
          Card,
          CardImg,
          CardBody,
          CardTitle,
          CardSubtitle
        } from 'reactstrap';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null,
      artistName: '',
      liveSearch: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      liveSearch: false
    });
  }

  searchArtist() {
    fetch('https://rest.bandsintown.com/artists/'+encodeURI(this.state.artistName)+'?app_id=a', {
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
    return (
      <Container>
        <Row>
          <Col className="text-center py-5">
            <h2>Welcome!</h2>
            <p>Type the name of an artist in the box below to search concerts:</p>
            <Form onSubmit={e => { e.preventDefault(); this.searchArtist(); }}>
              <InputGroup>
                <Input name="artistName" bsSize="lg" type="search" value={this.state.artistName} onChange={this.handleChange} />
                <InputGroupAddon addonType="append"><Button type="submit" color="primary" size="lg">Search!</Button></InputGroupAddon>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <SearchResult artist={this.state.artist} />
      </Container>
    );
  }
}

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: this.props.artist
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps);
  }

  render() {

    if (!this.state.artist || !this.state.artist) return (<div/>);

    return (
      <Row className="pb-5">
        <Col md={{size: 4, offset: 4}}>
          <Card tag={Link} to={"/artist/"+encodeURI(this.state.artist.name)}>
            <CardImg top width="100%" src={this.state.artist.thumb_url} alt={this.state.artist.name} />
            <CardBody>
              <CardTitle>{this.state.artist.name}</CardTitle>
              <CardSubtitle>{this.state.artist.upcoming_event_count} upcoming events</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

}

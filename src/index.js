import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {
          Navbar,
          NavbarBrand,
        } from 'reactstrap';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Artist from './Artist';

ReactDOM.render(
    <BrowserRouter>
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand tag={Link} to="/">EventSearch</NavbarBrand>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/artist/:name' component={Artist} />
          <Route path='/' render={(props) => (
            <div><p>404</p></div>
          )}/>
        </Switch>
      </div>
    </BrowserRouter>
  , document.getElementById('root'));

registerServiceWorker();

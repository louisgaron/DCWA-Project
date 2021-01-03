import React, { Component } from 'react';

import './App.css';
import { Content } from './components/content';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { listOfCountries } from './listOfCountries';
import { listOfCities } from './listOfCities';
import { listHeadsOfState } from './listHeadsOfState';


class App extends Component{
  render(){
    return (
      <Router>
      <div className="App">

        <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
        <Nav.Link href="/listOfCities">List Of Cities</Nav.Link>
        <Nav.Link href="/listOfCountries">List of Countries</Nav.Link>
        <Nav.Link href="/listHeadOfState">List of Head of State</Nav.Link>
        </Nav>
        </Navbar>


        <br />

        <Switch>
        <Route path='/views/listOfCities' component={listOfCities} exact/>
        <Route path='/views/listOfCountries' component={listOfCountries} exact/>
        <Route path='/views/listHeadsOfState' component={listHeadsOfState}></Route>
        </Switch>

        
      </div>
      </Router>
    );

  }
}

export default App;

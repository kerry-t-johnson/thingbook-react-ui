import './App.scss';
import Header from './components/shared/header';
import Home from './components/Home';
import BrowseOrganizations from './components/organization/BrowseOrganizations';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Organization from './components/organization/Organization';

export default class App extends React.Component {

  baseUrl = "http://localhost:3000/api/v1";

  render() {
    return (
      <div className="container">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route path="/browse-organizations">
              <BrowseOrganizations baseUrl={this.baseUrl} />
            </Route>
            <Route path="/organization/:selfLink" component={Organization} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }


}

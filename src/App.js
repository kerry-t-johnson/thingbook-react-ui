import './App.scss';
import Header from './components/shared/header';
import Home from './components/Home';
import PageFetchWrapper from './components/shared/pagination';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Organization from './components/organization/Organization';
import OrganizationSummary from './components/organization/OrganizationSummary';
import DatastreamSummary from './components/datastream/DatastreamSummary';
import Datastream from './components/datastream/Datastream';
import { apiEndpoint } from './components/shared/utils';

export default class App extends React.Component {

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
              <PageFetchWrapper resource_path={apiEndpoint('api/v1/organization')} item_component={OrganizationSummary} />
            </Route>
            <Route path="/browse-datastreams">
              <PageFetchWrapper resource_path={apiEndpoint('api/v1/data-sharing/template')} item_component={DatastreamSummary} />
            </Route>
            <Route path="/organization/:selfLink" component={Organization} />
            <Route path="/data-sharing/template/:selfLink" component={Datastream} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }


}

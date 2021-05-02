import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DataSharingAgreementCarousel from "./data-sharing/DataSharingAgreementCarousel";
import DataSharingAgreementPage from "./data-sharing/DataSharingAgreementPage";

export default class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <DataSharingAgreementCarousel />
                        </Route>
                        <Route path='/agreement/:id' render={(props) => <DataSharingAgreementPage id={props.match.params.id} />} />
                    </Switch>
                </BrowserRouter>
            </div >
        );
    }
}

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AdministratorPage from '../AdministratorPage';
import CustomerPage from '../CustomerPage';
import ReceptionPage from '../ReceptionPage';
import ManagerPage from '../ManagerPage';
import HomePage from '../HomePage';

class RoutePage extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/administrator" component={AdministratorPage} />
                    <Route path="/customer" component={CustomerPage} />
                    <Route path="/reception" component={ReceptionPage} />
                    <Route path="/manager" component={ManagerPage} />
                </Switch>
            </Router>
        );
    }

}

export default RoutePage;
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import HomePersona from './components/HomePersona';
import HomeDispositivo from './components/HomeDispositivo';
import AddPersona from './components/AddPersona';
import AddDispositivo from './components/AddDispositivo';
import EditPersona from './components/EditPersona';
import EditDispositivo from './components/EditDispositivo';

const App = () => {
    return(
        <Router className="App__container">
            <Switch>
                <Route exact path="/personas">
                    <HomePersona />
                </Route>
                <Route exact path="/dispositivos">
                    <HomeDispositivo />
                </Route>
                <Route path="/addpersona">
                    <AddPersona />
                </Route>
                <Route path="/adddispositivo">
                    <AddDispositivo />
                </Route>
                <Route path="/editpers/:id">
                    <EditPersona />
                </Route>
                <Route path="/editdisp/:id">
                    <EditDispositivo />
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('example'));
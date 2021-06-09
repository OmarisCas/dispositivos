import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import HomePersona from './components/HomePersona';
import HomeDispositivo from './components/HomeDispositivo';
import HomeCargo from './components/HomeCargo';
import AddPersona from './components/AddPersona';
import AddDispositivo from './components/AddDispositivo';
import AddCargo from './components/AddCargo';
import EditPersona from './components/EditPersona';
import EditDispositivo from './components/EditDispositivo';
import EditCargo from './components/EditCargo';

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
                <Route exact path="/cargos">
                    <HomeCargo />
                </Route>
                <Route path="/addpersona">
                    <AddPersona />
                </Route>
                <Route path="/adddispositivo">
                    <AddDispositivo />
                </Route>
                <Route path="/addcargo">
                    <AddCargo />
                </Route>
                <Route path="/editpers/:id">
                    <EditPersona />
                </Route>
                <Route path="/editdisp/:id">
                    <EditDispositivo />
                </Route>
                <Route path="/editcar/:id">
                    <EditCargo />
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('example'));
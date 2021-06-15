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
import HomeIpe from './components/HomeIpe';
import HomeEstado from './components/HomeEstado';
import HomeConexione from './components/HomeConexione';
import HomeMonitoreo from './components/HomeMonitoreo';
import HomeFiltro from './components/HomeFiltro';
import AddPersona from './components/AddPersona';
import AddDispositivo from './components/AddDispositivo';
import AddCargo from './components/AddCargo';
import AddIpe from './components/AddIpe';
import AddEstado from './components/AddEstado';
import AddConexione from './components/AddConexione';
import AddMonitoreo from './components/AddMonitoreo';
import AddFiltro from './components/AddFiltro';
import EditPersona from './components/EditPersona';
import EditDispositivo from './components/EditDispositivo';
import EditCargo from './components/EditCargo';
import EditIpe from './components/EditIpe';
import EditEstado from './components/EditEstado';
import EditConexione from './components/EditConexione';
import EditMonitoreo from './components/EditMonitoreo';
import EditFiltro from './components/EditFiltro';

const App = () => {
    return(
        <Router className="App__container">
            <Switch>
                <Route exact path="/personas">      <HomePersona />     </Route>
                <Route exact path="/dispositivos">  <HomeDispositivo /> </Route>
                <Route exact path="/cargos">        <HomeCargo />       </Route>
                <Route exact path="/ipes">          <HomeIpe />         </Route>
                <Route exact path="/estados">       <HomeEstado />      </Route>
                <Route exact path="/conexiones">    <HomeConexione />   </Route>
                <Route exact path="/monitoreos">    <HomeMonitoreo />   </Route>
                <Route exact path="/filtros">       <HomeFiltro />      </Route>
                <Route path="/addpersona">          <AddPersona />      </Route>
                <Route path="/adddispositivo">      <AddDispositivo />  </Route>
                <Route path="/addcargo">            <AddCargo />        </Route>
                <Route path="/addipe">              <AddIpe />          </Route>
                <Route path="/addest">              <AddEstado />       </Route>
                <Route path="/addcon">              <AddConexione />    </Route>
                <Route path="/addmon">              <AddMonitoreo />    </Route>
                <Route path="/addfil">              <AddFiltro />       </Route>
                <Route path="/editpers/:id">        <EditPersona />     </Route>
                <Route path="/editdisp/:id">        <EditDispositivo /> </Route>
                <Route path="/editcar/:id">         <EditCargo />       </Route>
                <Route path="/editipe/:id">         <EditIpe />         </Route>
                <Route path="/editest/:id">         <EditEstado />      </Route>
                <Route path="/editcon/:id">         <EditConexione />   </Route>
                <Route path="/editmon/:id">         <EditMonitoreo />   </Route>
                <Route path="/editfil/:id">         <EditFiltro />      </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('example'));
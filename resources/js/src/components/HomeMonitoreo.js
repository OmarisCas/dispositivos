import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import _ from "lodash";

const pageSize = 1;

const HomeMonitoreo = () => {
    const [monitoreos, setMonitoreos] = useState(null);
    const [conexiones, setConexiones] = useState([]);
    const [estados, setEstados] = useState([]);
    const [paginatedMonitoreos, setpaginatedMonitoreos] = useState();
    const [currentPage, setcurrentPage] = useState(1);

    const fetchMonitoreos = () => {
        api.getAllMonitoreos().then(res => {
            const result = res.data;
            setMonitoreos(result.data);
            setpaginatedMonitoreos(_(result.data).slice(0).take(pageSize).value());
        });
    }

    const fetchConexiones = () => {
        api.getAllConexiones().then(res => {
            const result = res.data;
            setConexiones(result.data);
        });
    }

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        fetchMonitoreos();
        fetchConexiones();
        fetchEstados();
    }, []);

    //probando
    const pageCount = monitoreos? Math.ceil(monitoreos.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedMonitoreo = _(monitoreos).slice(startIndex).take(pageSize).value();
        setpaginatedMonitoreos(paginatedMonitoreo);
    }
    //findeprobando

    const renderMonitoreos = () => {
        if(!paginatedMonitoreos){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando Conexiones...
                    </td>
                </tr>
            );
        }
        if(paginatedMonitoreos.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay Conexiones, agrega una.
                    </td>
                </tr>
            );
        }

        return paginatedMonitoreos.map((monitoreo, index) => (
            <tr key={index} className="text-center">
                <td>{monitoreo.fecha}</td>
                <td>{monitoreo.descripcion}</td>

                {conexiones.map((conexione, index) => {
                    if( monitoreo.conexione_id === conexione.id ){
                        return <td key={index}>{conexione.descripcion + " - " + conexione.ipe_id} </td>
                    }}
                )}              

                {estados.map((estado, index) => {
                    if( monitoreo.estado_id === estado.id ){
                        if (monitoreo.estado_id === 1) {
                            return <td key={index}>
                            <button className="btn btn-danger">
                                {estado.nombre}
                            </button> </td>
                        }else{
                            return <td key={index}>
                            <button className="btn btn-success">
                                {estado.nombre}
                            </button> </td>
                        }
                    }}
                )}

                <td>
                    <Link className="btn btn-warning" to={`/editmon/${monitoreo.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteMonitoreo(monitoreo.id)
                        .then(fetchMonitoreos)
                        .catch(err => {
                            alert('Fallo al eliminar monitoreo con id :' + monitoreo.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer
            classcard="card border-primary" classheader="card-header border-primary" title="Monitoreos">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addmon" className="btn btn-primary nav-link active">Agregar Monitoreo</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/dispositivos" className="btn btn-secundary nav-link">Dispositivos</Link>
                <Link to="/estados" className="btn btn-secundary nav-link">Estados</Link>
                <Link to="/filtros" className="btn btn-secundary nav-link">Filtros</Link>
                <Link to="/ipes" className="btn btn-secundary nav-link">IP's</Link>
                <Link to="/personas" className="btn btn-secundary nav-link">Personas</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>Fecha</th>
                            <th>Descripcion</th>
                            <th>Conexion</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderMonitoreos()}
                    </tbody>
                </table>
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        {
                            pages.map((page, index) => (
                                <li key={index} className={page === currentPage? "page-item active":"page-item"}>
                                    <p className="page-link" onClick={() => pagination(page)}>{page}</p>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </AppContainer>
    );
};

export default HomeMonitoreo;
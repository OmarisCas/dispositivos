import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import _ from "lodash";

const pageSize = 10;

const HomeConexione = () => {
    const [conexiones, setConexiones] = useState(null);
    const [dispositivos, setDispositivos] = useState([]);
    const [ipes, setIpes] = useState([]);
    const [estados, setEstados] = useState([]);
    const [paginatedConexiones, setpaginatedConexiones] = useState();
    const [currentPage, setcurrentPage] = useState(1);

    const fetchConexiones = () => {
        api.getAllConexiones().then(res => {
            const result = res.data;
            setConexiones(result.data);
            setpaginatedConexiones(_(result.data).slice(0).take(pageSize).value());
        });
    }

    const fetchDispositivos = () => {
        api.getAllDispositivos().then(res => {
            const result = res.data;
            setDispositivos(result.data)
        });
    }

    const fetchIpes = () => {
        api.getAllIpes().then(res => {
            const result = res.data;
            setIpes(result.data)
        });
    }

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        fetchConexiones();
        fetchDispositivos();
        fetchIpes();
        fetchEstados();
    }, []);

    //probando
    const pageCount = conexiones? Math.ceil(conexiones.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedConexione = _(conexiones).slice(startIndex).take(pageSize).value();
        setpaginatedConexiones(paginatedConexione);
    }
    //findeprobando

    const renderConexiones = () => {
        if(!paginatedConexiones){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando Conexiones...
                    </td>
                </tr>
            );
        }
        if(paginatedConexiones.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay Conexiones, agrega una.
                    </td>
                </tr>
            );
        }

        return paginatedConexiones.map((conexione, index) => (
            <tr key={index} className="text-center">
                {dispositivos.map((dispositivo, index) => {
                    if( conexione.dispositivo_id === dispositivo.id ){
                        return <td className="text-left" key={index}>{dispositivo.id + " - " + dispositivo.mac + " - " + dispositivo.nombre} </td>
                    }}
                )}              

                {ipes.map((ipe, index) => {
                    if( conexione.ipe_id === ipe.id ){
                        return <td key={index}>{ipe.longitud}</td>
                    }}
                )}

                {estados.map((estado, index) => {
                    if( conexione.estado_id === estado.id ){
                        if (conexione.estado_id === 1) {
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
                <td>{conexione.descripcion}</td>
                <td>
                    <Link className="btn btn-warning" to={`/editcon/${conexione.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteConexione(conexione.id)
                        .then(fetchConexiones)
                        .catch(err => {
                            alert('Fallo al eliminar conexion con id :' + conexione.ipe_id);
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
            classcard="card border-primary" classheader="card-header border-primary" title="Conexiones">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addcon" className="btn btn-primary nav-link active">Agregar Conexion</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
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
                            <th>Dispositivo</th>
                            <th>Dirección IP</th>
                            <th>Estado</th>
                            <th>Descripcion</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderConexiones()}
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

export default HomeConexione;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeConexione = () => {
    const [conexiones, setConexiones] = useState(null);
    const [dispositivos, setDispositivos] = useState([]);
    const [ipes, setIpes] = useState([]);
    const [estados, setEstados] = useState([]);

    const fetchConexiones = () => {
        api.getAllConexiones().then(res => {
            const result = res.data;
            setConexiones(result.data)
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

    const renderConexiones = () => {
        if(!conexiones){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando Conexiones...
                    </td>
                </tr>
            );
        }
        if(conexiones.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay Conexiones, agrega una.
                    </td>
                </tr>
            );
        }

        return conexiones.map((conexione) => (
            <tr>
                {dispositivos.map(dispositivo => {
                    if( conexione.dispositivo_id === dispositivo.id ){
                        return <td>{dispositivo.mac + " - " + dispositivo.nombre} </td>
                    }}
                )}              

                {ipes.map(ipe => {
                    if( conexione.ipe_id === ipe.id ){
                        return <td>{ipe.longitud}</td>
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
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteConexione(conexione.id)
                        .then(fetchConexiones)
                        .catch(err => {
                            alert('Fallo al eliminar conexion con id :' + ipe.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Conexiones">
            <Link to="/addcon" className="btn btn-primary">Agregar Conexion</Link>
            <Link to="/cargos" className="btn btn-secundary">Cargos</Link>
            <Link to="/dispositivos" className="btn btn-secundary">Dispositivos</Link>
            <Link to="/estados" className="btn btn-secundary">Estados</Link>
            <Link to="/ipes" className="btn btn-secundary">IP's</Link>
            <Link to="/personas" className="btn btn-secundary">Personas</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
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
            </div>
        </AppContainer>
    );
};

export default HomeConexione;
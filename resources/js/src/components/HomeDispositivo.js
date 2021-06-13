import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeDispositivo = () => {
    const [dispositivos, setDispositivos] = useState(null);
    const [personas, setPersonas] = useState([]);

    const fetchDispositivos = () => {
        api.getAllDispositivos().then(res => {
            const result = res.data;
            setDispositivos(result.data)
        });
    }

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data)
        });
    }

    useEffect(() => {
        fetchDispositivos();
        fetchPersonas();
    }, []);

    const renderDispositivos = () => {
        if(!dispositivos){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando dispositivos...
                    </td>
                </tr>
            );
        }
        if(dispositivos.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay dispositivos, agrega uno.
                    </td>
                </tr>
            );
        }

        return dispositivos.map((dispositivo) => (
            <tr>
                <td>{dispositivo.id}</td>
                <td>{dispositivo.mac}</td>
                <td>{dispositivo.nombre}</td>
                <td>{dispositivo.marca}</td>
                <td>{dispositivo.modelo}</td>

                {personas.map(persona => {
                    if( dispositivo.persona_id === persona.id ){
                        return <td>{persona.nombre+" "+persona.apellido}</td>
                    }}
                )}

                <td>
                    <Link className="btn btn-warning" to={`/editdisp/${dispositivo.id}`}>
                        EDITAR
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteDispositivo(dispositivo.id)
                        .then(fetchDispositivos)
                        .catch(err => {
                            alert('Fallo al eliminar dispositivo con id :' + dispositivo.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Dispositivos">
            <Link to="/adddispositivo" className="btn btn-primary">Agregar Dispositivo</Link>
            <Link to="/cargos" className="btn btn-secundary">Cargos</Link>
            <Link to="/conexiones" className="btn btn-secundary">Conexiones</Link>
            <Link to="/estados" className="btn btn-secundary">Estados</Link>
            <Link to="/ipes" className="btn btn-secundary">IP's</Link>
            <Link to="/personas" className="btn btn-secundary">Personas</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>MAC</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Dueño</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderDispositivos()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default HomeDispositivo;
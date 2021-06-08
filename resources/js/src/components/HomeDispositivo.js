import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeDispositivo = () => {
    const [dispositivos, setDispositivos] = useState(null);

    const fetchDispositivos = () => {
        api.getAllDispositivos().then(res => {
            const result = res.data;
            setDispositivos(result.data)
        });
    }

    useEffect(() => {
        fetchDispositivos();
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
                <td>{dispositivo.persona_id}</td>
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
                            <th>Persona</th>
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
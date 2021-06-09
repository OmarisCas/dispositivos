import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomePersona = () => {
    const [personas, setPersonas] = useState(null);
    const [cargos, setCargos] = useState([]);

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data)
        });
    }

    const fetchCargos = () => {
        api.getAllCargos().then(res => {
            const result = res.data;
            setCargos(result.data)
        });
    }

    useEffect(() => {
        fetchPersonas();
        fetchCargos();
    }, []);

    const renderPersonas = () => {
        if(!personas){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando personas...
                    </td>
                </tr>
            );
        }
        if(personas.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay personas, agrega una.
                    </td>
                </tr>
            );
        }

        return personas.map((persona, index) => (
            <tr>
                <td>{persona.id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                
                {cargos.map(cargo => {
                    if( persona.cargo_id === cargo.id ){
                        return <td>{cargo.nombre}</td>
                    }}
                )}
                
                <td>
                    <Link className="btn btn-warning" to={`/editpers/${persona.id}`}>
                        EDITAR
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deletePersona(persona.id)
                        .then(fetchPersonas)
                        .catch(err => {
                            alert('Fallo al eliminar persona con id :' + persona.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Personas">
            <Link to="/addpersona" className="btn btn-primary">Agregar Persona</Link>
            <Link to="/cargos" className="btn btn-secundary">Cargos</Link>
            <Link to="/dispositivos" className="btn btn-secundary">Dispositivos</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cargo</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPersonas()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default HomePersona;
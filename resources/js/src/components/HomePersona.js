import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomePersona = () => {
    const [personas, setPersonas] = useState(null);

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data)
        });
    }

    useEffect(() => {
        fetchPersonas();
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

        return personas.map((persona) => (
            <tr>
                <td>{persona.id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.cargo_id}</td>
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
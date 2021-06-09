import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeCargo = () => {
    const [cargos, setCargos] = useState(null);

    const fetchCargos = () => {
        api.getAllCargos().then(res => {
            const result = res.data;
            setCargos(result.data)
        });
    }

    useEffect(() => {
        fetchCargos();
    }, []);

    const renderCargos = () => {
        if(!cargos){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando cargos...
                    </td>
                </tr>
            );
        }
        if(cargos.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay cargos, agrega uno.
                    </td>
                </tr>
            );
        }

        return cargos.map((cargo) => (
            <tr>
                <td>{cargo.id}</td>
                <td>{cargo.nombre}</td>
                <td>{cargo.descripcion}</td>
                <td>
                    <Link className="btn btn-warning" to={`/editcar/${cargo.id}`}>
                        EDITAR
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteCargo(cargo.id)
                        .then(fetchCargos)
                        .catch(err => {
                            alert('Fallo al eliminar cargo con id :' + cargo.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Cargos">
            <Link to="/addcargo" className="btn btn-primary">Agregar Cargo</Link>
            <Link to="/dispositivos" className="btn btn-secundary">Dispositivos</Link>
            <Link to="/personas" className="btn btn-secundary">Personas</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCargos()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default HomeCargo;
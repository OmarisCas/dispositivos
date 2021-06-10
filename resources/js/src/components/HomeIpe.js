import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeIpe = () => {
    const [ipes, setIpes] = useState(null);

    const fetchIpes = () => {
        api.getAllIpes().then(res => {
            const result = res.data;
            setIpes(result.data)
        });
    }

    useEffect(() => {
        fetchIpes();
    }, []);

    const renderIpes = () => {
        if(!ipes){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando IP'S...
                    </td>
                </tr>
            );
        }
        if(ipes.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay IP'S, agrega una.
                    </td>
                </tr>
            );
        }

        return ipes.map((ipe) => (
            <tr>
                <td>{ipe.id}</td>
                <td>{ipe.longitud}</td>
                <td>
                    <Link className="btn btn-warning" to={`/editipe/${ipe.id}`}>
                        EDITAR
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteIpe(ipe.id)
                        .then(fetchIpes)
                        .catch(err => {
                            alert('Fallo al eliminar IP con id :' + ipe.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Direcciones IP'S">
            <Link to="/addipe" className="btn btn-primary">Agregar IP</Link>
            <Link to="/cargos" className="btn btn-secundary">Cargos</Link>
            <Link to="/dispositivos" className="btn btn-secundary">Dispositivos</Link>
            <Link to="/estados" className="btn btn-secundary">Estados</Link>
            <Link to="/personas" className="btn btn-secundary">Personas</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Longitud</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderIpes()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default HomeIpe;
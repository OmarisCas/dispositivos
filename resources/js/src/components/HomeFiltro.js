import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeFiltro = () => {
    const [filtros, setFiltros] = useState(null);

    const fetchFiltros = () => {
        api.getAllFiltros().then(res => {
            const result = res.data;
            setFiltros(result.data)
        });
    }

    useEffect(() => {
        fetchFiltros();
    }, []);

    const renderFiltros = () => {
        if(!filtros){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando Filtros...
                    </td>
                </tr>
            );
        }
        if(filtros.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay Filtros, agrega uno.
                    </td>
                </tr>
            );
        }

        return filtros.map((filtro, index) => (
            <tr key={index} className="text-center">
                <td>{filtro.codigo}</td>
                <td>{filtro.nombre}</td>
                <td>
                    <Link className="btn btn-warning" to={`/editfil/${filtro.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteFiltro(filtro.id)
                        .then(fetchFiltros)
                        .catch(err => {
                            alert('Fallo al eliminar filtro con id :' + ipe.id);
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
            classcard="card border-primary" classheader="card-header border-primary" title="Filtros">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addfil" className="btn btn-primary nav-link active">Agregar Filtro</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/dispositivos" className="btn btn-secundary nav-link">Dispositivos</Link>
                <Link to="/estados" className="btn btn-secundary nav-link">Estados</Link>
                <Link to="/ipes" className="btn btn-secundary nav-link">IP's</Link>
                <Link to="/personas" className="btn btn-secundary nav-link">Personas</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderFiltros()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default HomeFiltro;